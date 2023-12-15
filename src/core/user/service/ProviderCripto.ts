export default interface ProviderCripto {
  encrypt(value: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
