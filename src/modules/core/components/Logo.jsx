import { Dna } from 'lucide-react'

// Logotipo: ícono verde en forma de rombo + "BioHackers".
export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 rotate-45 place-items-center rounded-lg bg-marca-400">
        <Dna className="size-5 -rotate-45 text-[#13161c]" aria-hidden="true" />
      </span>
      <span className="text-2xl font-bold tracking-tight text-black">BioHackers</span>
    </div>
  )
}
