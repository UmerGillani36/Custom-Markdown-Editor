import React from 'react'
import MarkDownEditor from './src/MarkDownEditor';
const app = () => {
    const [description, setDescription] = useState(null);

  return (
    <div>
         <MarkDownEditor
                  onChange={setDescription}
                  desc={description}
                  disable={false}
                  iconDisable={true}
                />
    </div>
  )
}

export default app