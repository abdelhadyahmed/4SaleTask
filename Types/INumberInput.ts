export default interface INumberInput {
  value?: number;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: string | number;
  onChange?: (e: any) => void | undefined;
}
