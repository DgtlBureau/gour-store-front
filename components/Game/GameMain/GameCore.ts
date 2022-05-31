import { GameProductType } from "../GameProduct/GameProduct";
import { PlayerPosition } from "../GameOleg/GameOleg";

const PRODUCT_TYPES = [
  GameProductType.cheese, 
  GameProductType.sausage, 
  GameProductType.jamon, 
  GameProductType.chicken,
];

const PLAYER_POSITIONS = [
  PlayerPosition.topLeft,
  PlayerPosition.bottomLeft,
  PlayerPosition.topRight,
  PlayerPosition.bottomRight,
];

export interface GameProduct {
  type: GameProductType;
  position: PlayerPosition;
  step: 1 | 2 | 3 | 4;
}

export interface GameEvent {
  isPlaying: boolean;
  isRabbitShown: boolean;

  lives: number;
  speed: number;
  score: number;

  currentPlayerPosition: PlayerPosition;
  products: GameProduct[];
}

export class GameCore {
  // настройки
  private RABBIT_DISPLAY_TIME = 5000;
  private RABBIT_DISPLAY_PERIOD = 20000;
  private PRODUCT_PERIOD = 2000;

  private MAX_LIVES_COUNT = 3;
  private LAST_STEP = 4;

  private RECOVERY_CHECKPOINTS = [200, 500, 1000];
  private BOOST_CHECKPOINT = 20;
  private BRAKE_CHECKPOINT = 100;

  private BOOST_RATE = 0.1;
  private BRAKE_RATE = 0.2;

  // состояние игры
  private isPlaying= false;
  private isRabbitShown = false;

  private lives = this.MAX_LIVES_COUNT;
  private speed = 0;
  private score = 0;

  private currentPlayerPosition: PlayerPosition = PlayerPosition.bottomLeft;
  private products: GameProduct[] = [];
  
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
      
      currentPlayerPosition: this.currentPlayerPosition,
      products: this.products,
    };

    this.eventHandler(event);
  }

  start(){
    // Функция устанавливает isPlaying = true и
    // запускает методы runProductSendingLogic и runRabbitLogic
    this.isPlaying = true;

    this.runProductSendingLogic();
    this.runRabbitLogic();
    this.pushEvent();
  }

  finish(){
    // Функция устанавливает isPlaying = false
    this.isPlaying = false;

    this.pushEvent();
  }

  setPlayerPosition(position: PlayerPosition) {
    // Функция устанавливает текущее положение currentPlayerPosition и вызывает функцию tryToCatchProduct
    this.currentPlayerPosition = position;

    this.tryToCatchProduct();
    this.pushEvent();
  }

  private addScore() {
    // добавляет счет (возможно, зависит от speed - стоит уточнить у PM)
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

    if (this.lives === 0) this.finish();

    this.pushEvent();
  }

  private addProduct() {
    // Функция добавляет продукт в массив products cо случайными PlayerPosition и ProductType,
    // вызывает функцию runChangingProductStep
    const productTypeId = Math.floor(Math.random() * PRODUCT_TYPES .length);
    const positionId = Math.floor(Math.random() * PLAYER_POSITIONS.length);

    const product: GameProduct = {
      type: PRODUCT_TYPES [productTypeId],
      position: PLAYER_POSITIONS[positionId],
      step: 1,
    };
    const productId = this.products.push(product);

    this.runChangingProductStep(productId);

    this.pushEvent();
  }

  private tryToCatchProduct() {
    // Функция должна вызываться при каждом изменении currentPlayerPosition и step = LAST_STEP у каждого продукта
    // она должна проверять текущее положение игрока и проходить по всем активным товарам и ловить те,
    // что на LAST_STEP шаге. Если товар пойман - вызывается функция addScore если нет - вызывается функция subtractLive
    this.products.forEach((product, i) => {
      if (product.step !== this.LAST_STEP) return;

      if (product.position === this.currentPlayerPosition) this.addScore;
      else this.subtractLive;

      this.products.splice(i, 1);
    });

    this.pushEvent();
  }

  private getDeviation() {
    return Math.random();
  }

  private runProductSendingLogic() {
    // Вызывает функцию addProduct со скоро зависящей от speed
    // Функция должна вызывать себя саму с таймаутом до тех пор, пока isPlaying = true
    // Значение таймаута зависит от speed но имеет некоторое рандомное отклонение
    if (!this.isPlaying) return;

    this.addProduct();

    const deviation = this.getDeviation();
    const timeout = this.PRODUCT_PERIOD / (this.speed + deviation);

    setTimeout(this.runProductSendingLogic, timeout);
  }

  private runChangingProductStep(productId: number) {
    // Функция должна, в зависимости от this.speed изменять step продукта
    // Когда доходит до шага LAST_STEP - должна вызываться функция tryToCatchProduct
    // Функция должна вызывать себя саму вплоть до 5 шага (падения продукта) по таймауту
    if (!this.isPlaying) return;

    const product = this.products[productId];

    if (product.step !== this.LAST_STEP) {
      const updatedProduct = { ...product, step: product.step + 1 } as GameProduct;
      this.products.splice(productId, 1, updatedProduct);
    }
    else this.tryToCatchProduct();
      
    const timeout = this.PRODUCT_PERIOD / this.speed;

    setTimeout(() => this.runChangingProductStep(productId), timeout);

    this.pushEvent();
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
