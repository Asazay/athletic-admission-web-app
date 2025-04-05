import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { restoreUser } from "../store/session";
import Navigation from "../components/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}