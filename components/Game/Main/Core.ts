import { GameFieldPosition } from "../Player/Player";
import { GameProductType } from "../Product/Product";

export type GameProductStep = 0 | 1 | 2 | 3;

export const FIELD_POSITIONS: GameFieldPosition[] = [
  'topLeft',
  'bottomLeft',
  'topRight',
  'bottomRight',
];

const PRODUCT_POSITIONS: Record<GameProductType, GameFieldPosition> = {
  cheese: 'topLeft',
  sausage: 'bottomLeft',
  jamon: 'topRight',
  chicken: 'bottomRight',
};

type GameProductSteps = Record<GameProductType, GameProductStep>

export interface GameEvent {
  isPlaying: boolean;
  isRabbitShown: boolean;

  lives: number;
  speed: number;
  score: number;

  playerPosition: GameFieldPosition;
  products: GameProductSteps;
}

export class GameCore {
  // настройки
  private RABBIT_DISPLAY_TIME = 5000;
  private RABBIT_DISPLAY_PERIOD = 20000;
  private PRODUCT_PERIOD = 2000;

  private MAX_LIVES_COUNT = 3;
  private LAST_STEP = 3;

  private RECOVERY_CHECKPOINTS = [200, 500, 1000];
  private BOOST_CHECKPOINT = 20;
  private BRAKE_CHECKPOINT = 100;

  private BOOST_RATE = 0.1;
  private BRAKE_RATE = 0.2;

  private START_SPEED = 1;

  // состояние игры
  private isPlaying= false;
  private isRabbitShown = false;

  private lives = this.MAX_LIVES_COUNT;
  private speed = this.START_SPEED;
  private score = 0;

  private playerPosition: GameFieldPosition = 'basic';

  private products: GameProductSteps = {
    cheese: 0,
    sausage: 0,
    jamon: 0,
    chicken: 0,
  };
  
  private eventHandler: (e: GameEvent) => void;

  constructor(eventHandler: GameCore['eventHandler']) {
    this.eventHandler = eventHandler;
  }

  private pushEvent() {
    // Метод получает текущее состояние игры, группирует его в объект и вызывает функцию eventHandler
    const event: GameEvent = {
      isPlaying: this.isPlaying,
      isRabbitShown: this.isRabbitShown,
      
      lives: this.lives,
      speed: this.speed,
      score: this.score,
      
      playerPosition: this.playerPosition,
      products: this.products,
    };

    this.eventHandler(event);
  }

  start(){
    // Функция устанавливает isPlaying = true и
    // запускает методы runProductSendingLogic и runRabbitLogic
    this.reset();

    this.isPlaying = true;

    this.pushEvent();

    this.runProductSendingLogic();
    this.runRabbitLogic();
  }

  finish(){
    // Функция устанавливает isPlaying = false
    this.isPlaying = false;

    this.pushEvent();
  }

  setPlayerPosition(position: GameFieldPosition) {
    // Функция устанавливает текущее положение playerPosition
    if (!this.isPlaying) return;
    
    this.playerPosition = position;

    this.pushEvent();
  }

  private reset() {
    // Функция
    this.isRabbitShown = false;
  
    this.lives = this.MAX_LIVES_COUNT;
    this.speed = this.START_SPEED;
    this.score = 0;
  
    this.playerPosition = 'topLeft';
  
    this.products = {
      cheese: 0,
      sausage: 0,
      jamon: 0,
      chicken: 0,
    };
  }

  private increaseScore() {
    // увеличивает счет (возможно, зависит от speed - стоит уточнить у PM)
    // при достижении определенных чекпоинтов - должен менять speed
    // при наборе HEALTH_CHECKPOINTS очков происходит восстановление жизней
    // каждые BRAKE_CHECKPOINT очков уменьшение скорости на BRAKE_RATE
    // каждые BOOST_CHECKPOINT очков увеличение скорости на BOOST_RATE
    this.score++;

    if (this.RECOVERY_CHECKPOINTS.includes(this.score)) this.lives = this.MAX_LIVES_COUNT;

    if (this.score % this.BRAKE_CHECKPOINT === 0) this.speed -= this.BRAKE_RATE;
    else if (this.score % this.BOOST_CHECKPOINT === 0) this.speed += this.BOOST_RATE;

    this.pushEvent();
  }

  private subtractLive() {
    // Вычитает жизни (1 или 0.5 если заяц показан)
    // игра заканчивается при lives = 0 (вызывается finish())
    this.lives -= this.isRabbitShown ? 0.5 : 1;

    if (this.lives <= 0) this.finish();

    this.pushEvent();
  }

  private getRandomProductType() {
    // Функция возвращает случайный тип из пула доступных продуктов

    const availableProducts = Object.keys(this.products)
    .filter(it => this.products[it as GameProductType] === 0) as GameProductType[];
    
    const productTypeId = Math.floor(Math.random() * availableProducts.length);
    
    return availableProducts[productTypeId];
  }

  private moveProduct(productType: GameProductType) {
    // Сдвигает продукт на 1 шаг
    const currentStep = this.products[productType];

    this.products = {
      ...this.products,
      [productType]: currentStep + 1,
    }

    this.pushEvent();
  }

  private removeProduct(productType: GameProductType) {
    // убирает продукта с поля, возвращая на 0 шаг
    this.products = {
      ...this.products,
      [productType]: 0,
    };

    this.pushEvent();
  }
 
  private tryToCatchProduct(productType: GameProductType) {
    // Функция должна вызываться при step = LAST_STEP
    // Она должна проверять текущее положение игрока и товара,
    // если товар пойман - вызывается функция increaseScore если нет - вызывается функция subtractLive
    const productPosition = PRODUCT_POSITIONS[productType];

    if (productPosition === this.playerPosition) this.increaseScore();
    else this.subtractLive();

    this.removeProduct(productType);
  }

  private getDeviation() {
    return Math.random();
  }

  private runProductSendingLogic() {
    // Запускает движение продуктов
    // Функция должна вызывать себя саму с таймаутом до тех пор, пока isPlaying = true
    // Значение таймаута зависит от speed но имеет некоторое рандомное отклонение
    if (!this.isPlaying) return;

    const productType = this.getRandomProductType();

    if (productType) this.runProductMovement(productType);

    const deviation = this.getDeviation();
    const timeout = this.PRODUCT_PERIOD / (this.speed + deviation);

    setTimeout(() => this.runProductSendingLogic(), timeout);
  }

  private runProductMovement(productType: GameProductType) {
    // Функция должна, в зависимости от speed изменять step продукта
    // Вызывает саму себя вплоть до step = LAST_STEP
    // Когда доходит до шага LAST_STEP - должна сработать функция tryToCatchProduct
    if (!this.isPlaying) return;

    const currentStep = this.products[productType];

    if (currentStep !== this.LAST_STEP) {
      this.moveProduct(productType);

      const timeout = this.PRODUCT_PERIOD / this.speed;

      setTimeout(() => this.runProductMovement(productType), timeout);
    }
    else this.tryToCatchProduct(productType);
  }

  private runRabbitLogic() {
    // Функция в рандомное время (с частотой, зависящей от speed) показывает зайчика
    if (!this.isPlaying) return;

    const deviation = this.getDeviation();
    const displayPeriod = this.RABBIT_DISPLAY_PERIOD / (this.speed + deviation);

    setTimeout(() => {
      this.isRabbitShown = true;

      const displayTime = this.RABBIT_DISPLAY_TIME / this.speed;

      setTimeout(() => {
        this.isRabbitShown = false;
        
        this.runRabbitLogic();
      }, displayTime);
    }, displayPeriod);

    this.pushEvent();
  }
}
