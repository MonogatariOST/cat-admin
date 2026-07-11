 /**
 * BuiPage - Base UI page wrapper component / 基础 UI 页面容器组件
 *
  * Provides consistent spacing and max-width constraints for page content.
  * / 为页面内容提供统一的内边距和最大宽度约束。
 */

 import type { ReactNode } from 'react';

 /**
 * BuiPage component props / BuiPage 组件属性接口
 */
 export interface BuiPageProps {
  /** Child content / 子内容 */
   children: ReactNode;
   /** Maximum content width / 内容最大宽度 */
   maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
   /** Whether to apply default padding / 是否应用默认内边距 */
   padding?: boolean;
   /** Additional classes for the outer container / 外层容器的额外类名 */
   className?: string;
   /** Additional classes for the inner content wrapper / 内容包裹器的额外类名 */
   contentClassName?: string;
 }

 /** Max-width Tailwind mapping / 最大宽度映射 */
 const maxWidthClasses: Record<string, string> = {
   sm: 'max-w-3xl',
   md: 'max-w-5xl',
   lg: 'max-w-6xl',
   xl: 'max-w-7xl',
   full: 'max-w-full',
 };

 /**
 * BuiPage - Standard page content container / 标准页面内容容器
 *
 * @example
 * ```tsx
 * <BuiPage maxWidth="xl">
 *   <div>Page content here</div>
 * </BuiPage>
 * ```
 */
 const BuiPage = ({
  children,
   maxWidth = 'xl',
   padding = true,
   className = '',
   contentClassName = '',
 }: BuiPageProps) => {
   return (
     <div className={`flex flex-col ${padding ? 'px-6 py-6 sm:px-8' : ''} ${className}`}>
      {/* Content area / 内容区域 */}
       <div className={`${maxWidth !== 'full' ? `w-full ${maxWidthClasses[maxWidth]} mx-auto` : 'w-full'} ${contentClassName}`}>
         {children}
       </div>
     </div>
   );
 };

 export { BuiPage };
