import React, { Fragment } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
      {!loading && (
        <Routes>
          <Route
            {...rest}
            element={
              isAuthenticated ? <Element /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
