enum StatusEnum {
  Todo,
  InProgress,
  Complete,
}

export class TodoEntity {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: StatusEnum;
}
