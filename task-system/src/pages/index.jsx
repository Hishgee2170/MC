import Link from "next/link";
export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center gap-[40px] flex-col ">
      <img
        className="absolute w-full h-[100vh] z-[-2]"
        src="https://images.unsplash.com/photo-1570284613060-766c33850e00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div className=" text-[50px] text-gray-50 z-[-1]">Choose role</div>
      <div className="flex gap-[40px]">
        <Link href={"/components/Login"}>
          <div className="w-[250px] h-[100px] border-[2px] flex items-center justify-center text-[50px] text-gray-50 rounded-lg shadow-lg hover:backdrop-blur-sm  transition duration-300 ease-in-out backdrop-filter ">
            User
          </div>
        </Link>
        <Link href={"/components/EmployeeLogin"}>
          <div className="w-[250px] h-[100px] border-[2px] flex items-center justify-center text-[50px] text-gray-50 rounded-lg shadow-lg hover:backdrop-blur-sm  transition duration-300 ease-in-out backdrop-filter ">
            Employee
          </div>
        </Link>
      </div>
    </div>
  );
}
