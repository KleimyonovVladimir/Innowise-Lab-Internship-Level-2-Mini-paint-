export interface IProps {
  title: string
  buttonText: string
  formMessage: string
  link: string
  linkText: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  onChangeForEmail: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeForPassword: (event: React.ChangeEvent<HTMLInputElement>) => void
}
