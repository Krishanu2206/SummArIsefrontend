export interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

export interface LoginUserProps {
  identifier: string;
  password: string;
}

export interface AuthUserProps{
  username : string;
  email : string;
}

export interface ProfileFormProps {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  credits: number;
}

