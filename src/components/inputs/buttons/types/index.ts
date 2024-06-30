import {
  variant,
  size,
  textAlign,
  align,
} from '../constants/buttonStyles';

type ButtonVariant = keyof typeof variant;
type ButtonSize = keyof typeof size;
type ButtonShape = 'rounded' | 'sharp' | 'circle';
type ButtonTextAlign = keyof typeof textAlign;
type ButtonAlign = keyof typeof align;

type BaseProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  textAlign?: ButtonTextAlign;
  align?: ButtonAlign;
  isLoading?: boolean;
  icon?: JSX.Element;
  children: React.ReactNode;
};

export type ButtonProps<C extends React.ElementType> = BaseProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof BaseProps<C>>;

export type IconButtonProps<C extends React.ElementType = "button"> = Omit<
  BaseProps<C>,
  'variant' | 'textAlign' | 'icon' | 'align'
> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof BaseProps<C>> & {
    variant?: 'primary' | 'secondary';
    hover?: boolean;
    children: React.ReactNode;
  };
