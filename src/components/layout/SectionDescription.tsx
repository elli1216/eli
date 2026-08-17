
export const SectionDescription = ({children}: {children: string}) => {
  return (
    <p className="text-center text-muted-foreground mt-4 max-w-xl mx-auto text-sm md:text-base italic">
      {children}
    </p>
  )
}