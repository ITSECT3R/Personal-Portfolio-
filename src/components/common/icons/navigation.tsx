import { Icon } from '@iconify/react'
import type { IconProps } from '@iconify/react'

type NavIconProps = Partial<IconProps>

export const HomeIcon = (props: NavIconProps) => (
  <Icon icon="ion:home" {...props} />
)

export const ExperienceIcon = (props: NavIconProps) => (
  <Icon icon="solar:case-minimalistic-bold" {...props} />
)

export const ProjectsIcon = (props: NavIconProps) => (
  <Icon icon="material-symbols:folder-open" {...props} />
)

export const SkillsIcon = (props: NavIconProps) => (
  <Icon icon="fa6-solid:code" {...props} />
)
