import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryList } from '../redux/browse';
import { setSingleCategory } from '../redux/browse';
import { loggingIn } from '../redux/logIn';
import { useSearchParams } from 'react-router-dom';

const Explore = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const logInState = useSelector((state) => state.logIn);
  const categoryState = useSelector((state) => state.browse.categoryList);
  const dispatch = useDispatch();
  let accessToken = logInState?.accessToken;

  useEffect(() => {
    if (!logInState.loggedIn) {
      dispatch(loggingIn(code));
    }
  }, [code]);

  useEffect(() => {
    if (logInState.loggedin) dispatch(setCategoryList(accessToken));
  }, [logInState]);

  return (
    <div>
      <h1
        style={{
          color: 'white',
          paddingTop: '1em',
          textShadow: '2px 4px black',
        }}
      >
        Categories
      </h1>

      <div className="container">
        <div className="row align-items-center">
          {categoryState?.map((category) => {
            return (
              <div
                className="col-sm-3"
                key={category.id}
                onClick={() =>
                  dispatch(setSingleCategory(category.id, category.name))
                }
              >
                <Link
                  to={`/category/${category.id}`}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <img
                    src={category.icons[0].url}
                    alt="icon"
                    className="img-fluid mb-3"
                    style={{
                      borderRadius: '12rem',
                      boxShadow: '25px 24px 30px black',
                      paddingBottom: '0.5em',
                    }}
                  />
                  <h3
                    style={{
                      color: 'white',
                      paddingBottom: '1.5em',
                      textShadow: '2px 4px black',
                      fontSize: '23px',
                    }}
                  >
                    {category.name}
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
