'use client'

interface EquipmentSelectorProps {
  selectedEquipment: string[]
  onChange: (equipment: string[]) => void
}

const EQUIPMENT_OPTIONS = [
  'Grill', 'Fryer', 'Oven', 'Stovetop', 'Salamander', 
  'Sous Vide', 'Steamer', 'Griddle', 'Charbroiler', 
  'Pizza Oven', 'Smoker', 'Pressure Cooker', 'Wok Station'
]

export default function EquipmentSelector({ selectedEquipment, onChange }: EquipmentSelectorProps) {
  const toggleEquipment = (item: string) => {
    if (selectedEquipment.includes(item)) {
      onChange(selectedEquipment.filter(e => e !== item))
    } else {
      onChange([...selectedEquipment, item])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Available Kitchen Equipment
      </label>
      <div className="flex flex-wrap gap-2">
        {EQUIPMENT_OPTIONS.map(item => (
          <button
            key={item}
            type="button"
            onClick={() => toggleEquipment(item)}
            className={`px-3 py-1 rounded-lg transition-colors ${
              selectedEquipment.includes(item)
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}