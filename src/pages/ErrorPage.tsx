import { FC } from 'react';
import PageContent from '../components/PageContent/PageContent';
import MainNavigation from '../components/MainNavigation/MainNavigation';
import { useRouteError } from 'react-router-dom';

const ErrorPage: FC = () => {
  const error = useRouteError() as {
    statusText: string;
    status: number;
  };

  let title = 'Произошла ошибка!';
  let message = 'Что то пошло не так!';

  if (error.status === 500) {
    message = error.statusText;
  }

  if (error.status === 404) {
    title = 'Страница не найдена!';
    message = 'Страница не найдена. Пожалуйста, проверьте URL.';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
