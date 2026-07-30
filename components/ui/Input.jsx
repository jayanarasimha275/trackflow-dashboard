import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      icon: Icon,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-300">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <Icon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
          )}

          <input
            ref={ref}
            {...props}
            className={`
              h-14
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-[#0B1220]
              px-5
              ${Icon ? "pl-12" : ""}
              text-white
              placeholder:text-slate-500
              transition-all
              duration-200
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
              outline-none
              ${className}
            `}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
