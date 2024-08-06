import { useAppStore } from "@/store"

 

const Profile = () => {
  const {userInfo} = useAppStore();
  return (
    <div>{JSON.stringify(userInfo)}</div>
  )
}

export default Profile