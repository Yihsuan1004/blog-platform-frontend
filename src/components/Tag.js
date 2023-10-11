const Tag = ({ classes, name }) => {
  return (
    <button
      className={`bg-violet-100 text-gray-500 text-sm rounded-full py-1 px-2 min-w-[60px] ${classes}`}
    >
      {name}
    </button>
  );
};

export default Tag;
