declare module '@nozbe/watermelondb/Relation' {
  import { ColumnName, Model, RecordId, TableName } from "@nozbe/watermelondb";
  import { Observable } from "rxjs";
  import { $Call } from "utility-types";

  type ExtractRecordIdNonOptional<T extends Model> = (value: T) => RecordId
  type ExtractRecordIdOptional<T extends Model> = (value: T | void) => RecordId | void
  type ExtractRecordId<T extends Model> = ExtractRecordIdNonOptional<T> & ExtractRecordIdOptional<T>

  export interface Options {
    isImmutable: boolean,
  }

  export default class Relation<T extends (Model | void)> {
    public constructor(
      model: Model,
      relationTableName: TableName<T>,
      columnName: ColumnName,
      options: Options,
    );

    public id: $Call<ExtractRecordId<T>>;

    public fetch(): Promise<T>;

    public set(record: T): void;

    public observe(): Observable<T>;
  }
}