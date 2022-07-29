import PropTypes from 'prop-types';
import axios from 'axios';
import {API_URL} from '../../api/const';
import {updateToken} from './tokenReducer';
import {updateUser} from '../userReducer';
import {useDispatch} from 'react-redux';

export const tokenRequestAsync = ({user, passwd}) => {
  const dispatch = useDispatch();

  axios({
    method: 'post',
    url: `${API_URL}/login`,
    data: {
      login: user,
      password: passwd,
    },
  })
    .then(({
      data: {
        payload: {token},
      },
    }) => {
      dispatch(updateToken(token));
      dispatch(updateUser(user));
    })
    .catch((error) => console.log(error.message));
};

tokenRequestAsync.propTypes = {
  user: PropTypes.string,
  passwd: PropTypes.string,
};
