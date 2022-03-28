import Logo from './logo';
import style from './header.module.scss';

export default function Header() {

  return (
    <header className={style.header}>
      <Logo width="200px"/>
    </header>
  );
}
