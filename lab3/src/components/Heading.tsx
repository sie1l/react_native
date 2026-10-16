type HeadingProps = {
  firstName: string;
  lastName: string;
  group: string;
};

export default function Heading({ firstName, lastName, group }: HeadingProps) {
  return (
    <header className="page-header">
      <h1>
        Привіт, {firstName} {lastName}!
      </h1>
      <p>Група: {group}</p>
    </header>
  );
}
