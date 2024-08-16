import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACT_ROUTES } from "@/utils/constants";

 


const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center">
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce mr-0"
      >
        <path
          d="M20 10 L80 10 L80 30 L60 30 L60 90 L40 90 L40 30 L20 30 Z"
          fill="#8338ec"
          className="hover:fill-[#975aed] transition-colors duration-300"
        />
      </svg>
      <span className="text-3xl font-semibold ml-[-8px] z-2 animate-bounce-text">
        arang
      </span>
    </div>
  );
};


  
  const Title = ({text}) =>{
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-small ">{text}</h6>
    )
  }

  const ContactsContainer = () => {
    useEffect(() => {
        const getContacts = async () => {
            try {
                const res = await apiClient.get(GET_DM_CONTACT_ROUTES, { withCredentials: true });
                if (res.data.contacts) {
                    console.log(res.data.contacts, "DM_CONTACTS");
                }
            } catch (error) {
                console.error("Failed to fetch contacts:", error);
            }
        };

        getContacts();
    }, []); 
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <div className="pt-3">
            <Logo/>
        </div>
        <div className="my-5 flex items-center justify-between ">
            <div className="flex items-center justify-between gap-5 pr-10">
                <Title text={"Direct Messages"}/>
                <NewDM/>
            </div>
        </div>

        <div className="my-5  flex items-center justify-between ">
            <div className="flex items-center justify-center pr-10">
                <Title text={"Channels"}/>
            </div>
        </div>
        <ProfileInfo/>
        </div>
  )
}

export default ContactsContainer