import { useRouter } from 'next/router';

function Person() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Person {id}</div>;
}

export default Person;
