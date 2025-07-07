export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props;
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button className={`${className}`} {...restProps} />
    </>
  );
}
