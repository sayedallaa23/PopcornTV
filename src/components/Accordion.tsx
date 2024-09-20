import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ChevronDown } from "react-feather";

type AccordianContextType = {
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccordianContext = createContext<AccordianContextType | undefined>(
  undefined,
);

type AccordianProps = {
  children: ReactNode;
  value: string | null;
  onChange: (value: string | null) => void;
  [key: string]: any;
};

export default function Accordian({
  children,
  value,
  onChange,
  ...props
}: AccordianProps) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  return (
    <ul {...props}>
      <AccordianContext.Provider value={{ selected, setSelected }}>
        {children}
      </AccordianContext.Provider>
    </ul>
  );
}

type AccordianItemProps = {
  children: ReactNode;
  value: string;
  trigger: ReactNode;
  [key: string]: any;
};

export function AccordianItem({
  children,
  value,
  trigger,
  ...props
}: AccordianItemProps) {
  const context = useContext(AccordianContext);
  if (context === undefined) {
    throw new Error("AccordianItem must be used within an Accordian");
  }
  const { selected, setSelected } = context;
  const open = selected === value;

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <li className="border-b9" {...props}>
        <header
          role="button"
          onClick={() => setSelected(open ? null : value)}
          className="flex items-center justify-between p-4 font-medium text-white"
        >
          {trigger}
          <ChevronDown
            size={16}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </header>
        <div
          className="overflow-y-hidden transition-all"
          style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
        >
          <div className="p-4 pt-2" ref={ref}>
            {children}
          </div>
        </div>
      </li>
      <div className="grain2 h-[1px] w-[100%]"></div>
    </div>
  );
}
