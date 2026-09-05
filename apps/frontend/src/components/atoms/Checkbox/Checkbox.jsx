function Checkbox({ id, name, label, checked = false, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 cursor-pointer rounded border-2 border-[#888] bg-transparent text-brand focus:ring-brand/50"
      />
      <span className="text-body-15 text-form font-prompt">{label}</span>
    </label>
  )
}

export default Checkbox
