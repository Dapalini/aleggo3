import { usePathname } from 'next/navigation';
import Link from 'next/link';

const CustomerSideBar = () => {
  const pathName = usePathname();

  return (
    <div className="d-flex flex-column vh-100 border position-fixed" style={{ width: '280px' }}>
      <div className="list-group flex-grow-1 overflow-auto">
        <Link href="/users/usersList" className={`list-group-item list-group-item-action ${pathName.includes("usersList") || pathName.includes("edit") || pathName.includes("view") ? "active" : ""}`} aria-current="true">
          Users
        </Link>
        <Link href="/users/workerAssignmentList" className={`list-group-item list-group-item-action ${pathName.includes("workerAssignmentList") ? "active" : ""}`} aria-current="true">
          Worker assignment
        </Link>
        <Link href="/users/workerEconomy" className={`list-group-item list-group-item-action ${pathName.includes("workerEconomy") ? "active" : ""}`}>
          Worker economy
        </Link>
      </div>
    </div>
  );
};

export default CustomerSideBar;
