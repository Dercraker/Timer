import type { PageParams } from '@/types/next';
import { MainTimer } from './_component/mainTimer/mainTimer';

const RoutePage = ({}: PageParams) => {
  return (
    <>
      <MainTimer />
    </>
  );
};

export default RoutePage;
