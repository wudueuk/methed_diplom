import style from './Button.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Button = ({value, styles, onclick}) => (
  <button className={classNames(style.button, styles)}
    onClick={onclick}>
    <span className={style.value}>{value}</span>
  </button>
);

Button.propTypes = {
  value: PropTypes.string,
  styles: PropTypes.string,
  onclick: PropTypes.func,
};
