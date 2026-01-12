import Twig from 'twig'

export function autoRegisterTwig() {
  // 1. 扫描所有 twig 文件
  const modules = import.meta.glob(
    '../templates/**/*.twig',
    { as: 'raw', eager: true }
  )

  // 2. 注册到 twig.js
  Object.entries(modules).forEach(([path, template]) => {
    // ../templates/components/header.twig
    // -> components/header
    const id = path
      .replace('../templates/', '')
      .replace('.twig', '')

    Twig.twig({
      id,
      data: template as string,
      allowInlineIncludes: true,
    } as any)
  })
}
