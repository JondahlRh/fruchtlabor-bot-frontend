import { FaCopy } from "react-icons/fa6";

type DbidCopyTextProps = {
  _id: string;
};
const DbidCopyText = (props: DbidCopyTextProps) => {
  const dbidCopyButtonClickHandler = () => {
    navigator.clipboard.writeText(props._id);
  };
  return (
    <p
      className="flex cursor-pointer items-center text-neutral-500 hover:text-neutral-400"
      title="Id kopieren"
      onClick={dbidCopyButtonClickHandler}
    >
      <FaCopy className="mr-1" />
      <span>{props._id}</span>
    </p>
  );
};

export default DbidCopyText;
