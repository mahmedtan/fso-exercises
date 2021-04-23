interface Props {
  courseName: string;
}

const Header = ({ courseName }: Props) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

export default Header;
