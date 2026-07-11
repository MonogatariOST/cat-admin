 /**
 * BuiErrorBoundary - React Error Boundary component / React 错误边界组件
 *
 * Catches rendering-stage exceptions and displays a fallback UI instead of
 * crashing the entire page. Supports retry and error detail expansion.
 * / 捕获渲染阶段的异常，显示降级 UI 而非让整个页面崩溃。支持重试和展开错误详情。
 */

 import { Component, type ErrorInfo, type ReactNode } from "react";
 import { Alert, Button } from "@heroui/react";
 import { AlertTriangle, RefreshCw } from "lucide-react";

 /** Props for BuiErrorBoundary / BuiErrorBoundary 属性 */
 export interface BuiErrorBoundaryProps {
   /** Child content to wrap / 要包裹的子内容 */
   children: ReactNode;
   /** Optional custom fallback UI / 可选的自定义降级 UI */
   fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
   /** Callback when an error is caught / 捕获错误时的回调 */
   onError?: (error: Error, errorInfo: ErrorInfo) => void;
 }

 /** State for BuiErrorBoundary / BuiErrorBoundary 状态 */
 interface BuiErrorBoundaryState {
   hasError: boolean;
   error: Error | null;
   errorInfo: ErrorInfo | null;
 }

 /**
 * BuiErrorBoundary component
 *
 * @example
 * ```tsx
 * <BuiErrorBoundary onError={(err) => reportError(err)}>
 *   <MyComponent />
 * </BuiErrorBoundary>
 * ```
 */
 export class BuiErrorBoundary extends Component<
   BuiErrorBoundaryProps,
   BuiErrorBoundaryState
 > {
   constructor(props: BuiErrorBoundaryProps) {
     super(props);
     this.state = { hasError: false, error: null, errorInfo: null };
   }

   // / Update state when an error is caught / 捕获错误时更新状态
   static getDerivedStateFromError(error: Error): Partial<BuiErrorBoundaryState> {
     return { hasError: true, error };
   }

   // / Log error details and call optional onError callback / 记录错误详情并调用可选的 onError 回调
   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
     this.setState({ errorInfo });
     this.props.onError?.(error, errorInfo);
   }

   // / Reset the error boundary to retry rendering children / 重置错误边界以重试渲染子组件
   handleReset = (): void => {
     this.setState({ hasError: false, error: null, errorInfo: null });
   };

   render(): ReactNode {
     if (!this.state.hasError) return this.props.children;

     // Allow custom fallback via prop / 支持通过 prop 自定义降级 UI
     if (this.props.fallback) {
       if (typeof this.props.fallback === "function") {
         return (this.props.fallback as (e: Error, r: () => void) => ReactNode)(
           this.state.error!,
           this.handleReset,
         );
       }
       return this.props.fallback;
     }

     const { error, errorInfo } = this.state;
     const errorName = error?.name ?? "Error";
     const errorMessage = error?.message ?? "An unexpected error occurred";
     const componentStack = errorInfo?.componentStack ?? "";

     return (
       <div className="flex flex-col items-center justify-center py-16 px-4">
         <Alert
           status="danger"
           className="w-full max-w-lg"
         >
           <Alert.Indicator />
           <Alert.Content>
             <Alert.Title>
               <span className="flex items-center gap-2">
                 <AlertTriangle size={18} />
                 {errorName}
               </span>
             </Alert.Title>
             <Alert.Description className="mt-1 text-sm">
               {errorMessage}
             </Alert.Description>

             {componentStack && (
               <details className="mt-3">
                 <summary className="cursor-pointer text-xs text-foreground-400 hover:text-foreground transition-colors">
                   Error details
                 </summary>
                 <pre className="mt-2 max-h-48 overflow-auto rounded bg-surface-tertiary p-3 text-xs text-foreground-500 font-mono whitespace-pre-wrap">
                   {componentStack}
                 </pre>
               </details>
             )}

             <div className="mt-4 flex gap-2">
               <Button
                 variant="secondary"
                
                 size="sm"
                 onPress={this.handleReset}
               >
                 <RefreshCw size={14} />
                 Retry
               </Button>
             </div>
           </Alert.Content>
         </Alert>
       </div>
     );
   }
 }
