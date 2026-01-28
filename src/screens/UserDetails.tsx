import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchUserDetails } from "../api/user";
import type { User } from "../interfaces/user.interface";
import { Header } from "../components/Header";

export const UserDetails = () => {
  const [user, setUser] = useState<User | null>(null)
  let { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchUserDetails(parseInt(userId)).then((user: any) => {
        setUser(user)
      })
    }
  }, []);


  return (
    <div>
      <Header title="Dettaglio Utente" />
      <div className="flex justify-center p-2">
        <div className="flex flex-col border rounded-xl p-3 justify-start w-[50%]">
          <table >
            <tbody>
              <tr>
                <td><p className="w-0.5">Nome:</p></td>
                <td><span className="font-bold text-right">{user?.name}</span></td>
              </tr>
              <tr>
                <td><p className="w-full ">Username:</p></td>
                <td><span className="font-bold text-right">{user?.username}</span></td>
              </tr>
              <tr>
                <td><p className="w-full ">Email:</p></td>
                <td><span className="font-bold text-right">{user?.email}</span></td>
              </tr>
              <tr>
                <td><p className="w-full ">Telefono:</p></td>
                <td><span className="font-bold text-right">{user?.phone}</span></td>
              </tr>
              <tr>
                <td><p className="w-full ">Sito web:</p></td>
                <td><span className="font-bold text-right">{user?.website}</span></td>
              </tr>
              <tr>
                <td><p className="w-full ">Azienda:</p></td>
                <td><span className="font-bold text-right">{user?.company.name}</span></td>
              </tr>
              <tr>
                <td><p className="w-full ">Indirizzo:</p></td>
                <td><span className="font-bold text-right">{user?.address.street}, {user?.address.zipcode} {user?.address.city}</span></td>
              </tr>
            </tbody>
          </table>
          <div className='flex justify-end mt-4'>
            <button onClick={() => navigate(-1)}>Indietro</button>
          </div>
        </div>
      </div>
    </div>
  )
}