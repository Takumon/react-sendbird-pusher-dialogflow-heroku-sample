export interface Bot {
    questions: Questions;
    offset: Number;
    datas: Object;
    registerFunc: Function;

    getCurrentQuestion(): Question;
    hasNextQuestion(): boolean;
    reactionToAnwer(message: any): void;
    backToSquareOne(): void;
    nextQuestion(): void;
    execQuestion(): void;

    saveData(key: string, value: any): void;
    updateData(key: string, value: any): any; // return updatedValue
    getData(key: string): any; // return current value
    deleteData(key: string): any; // return deleted value(old value)
    deleteDataAll(): void;
    saveDatas(datas: [{ key: string, value: any }]): void;
    restart(): void; // delete all datas and retry from first question.
  }

export type ValidationResult = {
  isValid: boolean;
  error?: any;
};

export type PostProcessResult = {
  success: boolean;
  error?: any;
  result?: any;
};

export interface Question {
  bot: Bot;
  registerFunc: Function;
  exec(): Promise<void>;
  validateAnswer(mesage: any): Promise<ValidationResult>;
  postProcess(message: any): Promise<PostProcessResult>;
}

export interface Questions extends Array<Question>{}

export const DATA_TYPE = {
  CONDITON_AIRELINE_TYPE: 'CONDITON_AIRELINE_TYPE',
};
