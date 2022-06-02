import {GameProductType} from "../GameProduct/GameProduct";
import {PlayerPosition} from "../Oleg/Oleg";

export interface GameProduct {
    type: GameProductType;
    position: PlayerPosition;
    step: 1 | 2 | 3 | 4;
}

export interface GameEvent {
    products: GameProduct[];
    level: number;
    score: number;
    isRabbitShown: boolean;
    currentPlayerPosition: PlayerPosition;
    isPlaying: boolean;
}

export class GameCore {
    private level = 0;
    private isPlaying= false;
    private isRabbitShown = false;
    private currentPlayerPosition: PlayerPosition = PlayerPosition.bottomLeft;
    private eventHandler: (e: GameEvent) => void;
    private products: GameProduct[] = [];
    private score = 0;

    constructor(eventHandler: GameCore['eventHandler']) {
        this.eventHandler = eventHandler;
    }

    start(){
        // Функция устанавливает isPlaying = true и
        // запускает метод runProductSendingLogic
    }
    stop(){
        // Функция устанавливает isPlaying = false
    }

    private finish(){
        // метод останавливает игру, в случае, когда закончились жизни и был пропущен товар
    }

    private pushEvent() {
        // Метод получает текущее состояние игры, группирует его в объект и вызывает функцию eventHandler
    }

    private runProductSendingLogic() {
        // Вызывает функцию addProduct со скоро завящей от level
        // Функция долажна вызывать себя саму с таймаутом до тех пор, пока isPlaying = true
        // Значение таймаута зависит от level но имеет некоторое рандомное отклонение
    }

    private runRabbitLogic() {
        // Функция в рандомное время (с частотой, зависящей от level) показывает зайчика
    }

    private addProduct() {
        // Функция добавляет продукт в массив products в рандомном PlayerPosition и вызывает функцию runChangingProductStep
    }

    private runChangingProductStep() {
        // Функция должна, в зависимости от this.level изменять step продукта
        // Когда доходит до шага 4 - должна вызываться функция tryToCatchProduct
        // Если подошло время следующего шага, а продукт на 4 уровне - то вызывается функция
        // Функция должна вызывать себя саму вплоть до 5 шага (падения продукта) по таймауту
    }

    private tryToCatchProduct() {
        // Функция должна вызываться при каждом изменении currentPlayerPosition и step у каждого продукта
        // она должна проверять текущее положение игрока и проходить по всем активным товарам и ловить те,
        // что на 4 шаге. Если товар пойман - вызывается функция addScore если нет - вызывается функция subtractLive
    }

    private addScore() {
        // добавляет счет (возможно, завивсит от level - стоит уточнить у PM)
        // при достижении определенных чекпоинтов - должен менять level
    }

    private subtractLive() {
        // вычитает одну жизнь. Если жизнь на момент вычитания 1 - тогда игра заканчивается (вызывается finish())
    }

    setPlayerPosition() {
        // Функция устанавливает текущее положение currentPlayerPosition и вызывает функцию tryToCatchProduct
    }
}