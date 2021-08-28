interface TaskType {
  title: string
  date: string
  content: string
  status: 'completed' | 'uncompleted'
}

interface TaskClassType {
  category: string
  tasks: TaskType[]
}
