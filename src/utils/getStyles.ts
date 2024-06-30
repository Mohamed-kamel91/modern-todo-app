type SelectedVariants<Variants> = {
  [P in keyof Variants]: keyof Variants[P];
};

export function getStyles<
  Variants extends Record<string, Record<string, string>>,
>(base: string = "", variants: Variants) {
  return function (selectedVariants: SelectedVariants<Variants>) {
    let styles = [base];

    for (const key of Object.keys(selectedVariants)) {
      const variant = variants[key];
      const selectedVariant = selectedVariants[key] as string;
      const variantStyles = variant[selectedVariant];

      styles.push(variantStyles);
    }

    return styles;
  };
}
