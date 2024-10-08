import Main from "@/src/app/[locale]/_components/Main/Main";


export default function Home({params}) {
  return (
    <div>
      <Main  params={params}/>
    </div>
  );
}
