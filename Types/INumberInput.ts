export default interface INumberInput {
  value?: string | number;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (e: any) => void | undefined;
}
