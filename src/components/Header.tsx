type headerProps = {
  title: string;
};

const Header = ({ title }: headerProps) => {
  const content = (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
  return content;
};

export default Header;
