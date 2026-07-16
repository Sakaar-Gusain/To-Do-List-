
import TextInput from "@/components/Input";


export default async function DayPage({ params }) {
  const { day } = await params;

  return (
    <div>
      <h1 className="capitalize align-center text-3xl text-center">{day}</h1>
      <TextInput day={day} />
    </div>
  );
}