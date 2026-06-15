import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface FormModalContextValue {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <FormModalContext.Provider value={{ isOpen, openForm, closeForm }}>
      {children}
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  const ctx = useContext(FormModalContext);
  if (!ctx) throw new Error("useFormModal must be used within FormModalProvider");
  return ctx;
}
