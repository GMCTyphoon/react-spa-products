import CreateProductForm from '../components/CreateProductForm/CreateProductForm';
import PageContent from '../components/PageContent/PageContent';

function CreateProductPage() {
  return (
    <>
      <PageContent title="Создать продукт">
        <CreateProductForm method="post" />
      </PageContent>
    </>
  );
}

export default CreateProductPage;
