<!-- PROJECT-INFO-START -->
## 项目信息 (Project Info)

### 技术栈 (Tech Stack)

- **框架**: React 19 + TypeScript 6
- **构建工具**: Vite 8
- **UI 组件库**: HeroUI v3 (`@heroui/react` + `@heroui/styles`)
- **图标库**: Lucide (lucide-react), Heroicons (@heroicons/react), Gravity UI Icons (@gravity-ui/icons)
- **样式方案**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **包管理器**: pnpm
- **路由库**: react-router v8
- **状态管理**: Jotai
- **HTTP 客户端**: axios
- **图表库**: @visx (group, shape, scale, curve, mock-data)
- **字体**: @fontsource/noto-sans-sc (自托管 Noto Sans SC)
- **代码规范**: ESLint 10 (flat config), `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **语言环境**: ESM (浏览器端)

### 目录结构 (Directory Structure)

```
hero-admin/
├── _backups/                    # 自动备份目录
├── public/                      # 公共静态资源
├── src/
│   ├── api/                     # API 请求层
│   │   ├── request.ts           # axios 实例及拦截器
│   │   ├── index.ts             # 统一导出入口
│   │   └── {module}/            # 业务模块（auth, user, articles 等）
│   ├── assets/                  # 静态资源（图片、字体等）
│   ├── components/
│   │   ├── baseui/              # 基础 UI 组件（BuiTable, BuiPage, BuiToolbar, BuiErrorBoundary）
│   │   └── serviceui/           # 业务 UI 组件（SuiLine, SuiFileUpload, SuiRichText 等）
│   ├── hooks/                   # 自定义 Hook（useAuth, useTheme, useAutoRows）
│   ├── layouts/                 # 布局组件（MainLayout, AuthLayout）
│   ├── routes/                  # 路由配置（按模块分目录）
│   │   ├── index.ts             # 主路由汇总
│   │   ├── guards.tsx           # 路由守卫
│   │   ├── route-elements.tsx   # 路由级组件
│   │   └── {module}/            # 模块路由（dashboard, user, articles 等）
│   ├── stores/                  # Jotai 全局状态
│   │   ├── index.ts             # 导出入口
│   │   ├── auth/                # 认证状态
│   │   └── page-title/          # 页面标题上下文
│   ├── types/                   # TypeScript 类型定义
│   ├── views/                   # 页面组件（按模块分目录）
│   ├── App.tsx                  # 根组件
│   ├── main.tsx                 # 入口文件
│   ├── main.css                 # 全局样式
│   ├── index.css                # Tailwind 指令
│   └── theme.css                # HeroUI CSS 变量主题
├── .agents/                     # 代理技能与配置
├── .heroui-docs/                # HeroUI 文档缓存
├── .env                         # 环境变量（+ .env.development, .env.production）
├── eslint.config.js             # ESLint 扁平化配置
├── vite.config.ts               # Vite 构建配置
├── tsconfig.json                # TypeScript 基础配置
├── tsconfig.app.json            # TypeScript 应用配置
├── tsconfig.node.json           # TypeScript Node 配置
├── index.html                   # HTML 入口
├── package.json
└── pnpm-lock.yaml
```

新增功能性组件/页面时，应在 `src/` 下创建对应目录，保持层级扁平。业务模块（如 user、articles）同时涉及 api、routes、views 三个目录，应在这三个目录下同步创建同名模块文件夹。
<!-- PROJECT-INFO-END -->

<!-- BACKUP-RULES-START -->
## 澶囦唤瑙勫垯 (Backup Rules)

姣忔瀵规枃浠惰繘琛屼慨鏀逛箣鍓嶏紝蹇呴』鎵ц浠ヤ笅澶囦唤娴佺▼锛?
1. 妫€鏌ラ」鐩牴鐩綍涓嬫槸鍚﹀瓨鍦?`_backups` 鏂囦欢澶癸紝濡傛灉涓嶅瓨鍦ㄥ垯鍒涘缓
2. 鑾峰彇褰撳墠鏃ユ湡锛屾牸寮忎负 `YYYYMMDD`锛堜緥濡?`20260709`锛夛紝浣滀负鏃ユ湡鏂囦欢澶瑰悕
3. 鑾峰彇褰撳墠鏃堕棿锛屾牸寮忎负 `HHmmss`锛堜緥濡?`200000` 浠ｈ〃 20:00:00锛夛紝浣滀负鏃堕棿鏂囦欢澶瑰悕
4. 鍦?`_backups/YYYYMMDD/HHmmss/` 涓嬪垱寤轰笌鍘熷鏂囦欢鐩稿悓鐨勭洰褰曞眰绾?5. 灏嗘湰娆¤淇敼鐨勬墍鏈夋枃浠跺鍒跺埌澶囦唤鐩綍涓搴旂殑浣嶇疆

澶囦唤璺緞绀轰緥锛歚_backups/20260709/200000/src/components/Button.tsx`

娉ㄦ剰锛氬浠藉簲鍦ㄤ慨鏀规枃浠朵箣鍓嶅畬鎴愶紝纭繚澶囦唤鐨勬槸淇敼鍓嶇殑鍘熷鍐呭銆?<!-- BACKUP-RULES-END -->

<!-- ESLINT-RULES-START -->
## ESLint 瑙勮寖瑙勫垯 (ESLint Rules)

鏈」鐩娇鐢?ESLint 杩涜浠ｇ爜瑙勮寖妫€鏌ワ紝鎵€鏈変唬鐮佷慨鏀瑰繀椤婚伒瀹堜互涓嬭鍒欙細

1. 姣忔瀵规枃浠惰繘琛屼慨鏀规椂锛屼慨鏀瑰悗鐨勪唬鐮佸繀椤荤鍚?ESLint 瑙勮寖
2. 涓ョ浣跨敤 `eslint-disable` 鎴?`eslint-disable-next-line` 绛夋敞閲婃潵缁曡繃妫€鏌?3. 鍦ㄦ瘡娆″璇濈粨鏉熷墠锛屽繀椤昏繍琛?ESLint 妫€鏌ラ獙璇佹墍鏈変慨鏀硅繃鐨勬枃浠舵槸鍚﹂€氳繃
4. 濡傛灉 ESLint 妫€鏌ユ湭閫氳繃锛屽繀椤讳慨澶嶄唬鐮佺洿鍒板畬鍏ㄩ€氳繃锛屼笉寰楅€氳繃绂佺敤瑙勫垯鏉ユ帺鐩栭棶棰?<!-- ESLINT-RULES-END -->

<!-- HEROUI-USAGE-RULES-START -->
## HeroUI 澶嶇敤瑙勫垯 (HeroUI Reuse Rules)

涓ョ閲嶅瀹炵幇 HeroUI 宸叉彁渚涚殑鍔熻兘锛屽繀椤讳紭鍏堜娇鐢?HeroUI 缁勪欢锛屽叿浣撹鍒欏涓嬶細

1. **浼樺厛浣跨敤 HeroUI**锛氭墍鏈?UI 鍔熻兘搴斾紭鍏堜娇鐢?`@heroui/react` 鎻愪緵鐨勭粍浠跺疄鐜帮紝鍖呮嫭浣嗕笉闄愪簬 Button銆両nput銆丼elect銆丮odal銆乀able銆丗orm銆丏ropdown銆乀oast 绛?2. **涓嶅緱閲嶅閫犺疆瀛?*锛氬鏋?HeroUI 宸叉湁鐜版垚缁勪欢锛屼弗绂佽嚜琛岀紪鍐欐牱寮忔垨鍔熻兘鏇夸唬鏂规
3. **鑷畾涔変笟鍔＄粍浠?*锛氱粡楠岃瘉 HeroUI 纭疄鏃犳硶婊¤冻闇€姹傛椂锛屾墠瀹炵幇鑷畾涔変笟鍔＄粍浠讹紝涓斿繀椤绘斁鍦?`src/components/` 鐩綍涓?4. **serviceui 缁撴瀯**锛氬湪 `src/components/serviceui/` 涓嬪垱寤鸿嚜瀹氫箟涓氬姟缁勪欢锛屼互 `sui-xxx` 鍛藉悕缁勪欢鏂囦欢澶癸紙渚嬪 `sui-data-table`銆乣sui-chart-panel`锛夛紝閬靛惊浠ヤ笅缁撴瀯锛?   ```
   src/components/serviceui/
   鈹溾攢鈹€ index.ts                    # 瀵煎嚭鎵€鏈?serviceui 缁勪欢
   鈹溾攢鈹€ sui-data-table/
   鈹?  鈹溾攢鈹€ index.ts                # 瀵煎嚭褰撳墠缁勪欢
   鈹?  鈹斺攢鈹€ SuiDataTable.tsx
   鈹溾攢鈹€ sui-chart-panel/
   鈹?  鈹溾攢鈹€ index.ts
   鈹?  鈹斺攢鈹€ SuiChartPanel.tsx
   鈹斺攢鈹€ ...
   ```
5. **鍏ュ彛瀵煎嚭**锛歚src/components/serviceui/index.ts` 缁熶竴瀵煎嚭鎵€鏈夌粍浠讹紙`export { SuiDataTable } from './sui-data-table'`锛夛紝姣忎釜缁勪欢鏂囦欢澶瑰唴鐨?`index.ts` 璐熻矗瀵煎嚭璇ョ粍浠讹紙`export { SuiDataTable } from './SuiDataTable'`锛?7. **缁勪欢鍛藉悕**锛氫互 Sui 浣滀负缁勪欢鍓嶇紑锛堝 `SuiDataTable`銆乣SuiChartPanel`锛夛紝鏂囦欢澶瑰悕涓庣粍浠跺悕瀵瑰簲
<!-- HEROUI-USAGE-RULES-END -->

<!-- BASEUI-RULES-START -->


> **缁勭粐缁撴瀯**锛歚src/components/` 鐩綍涓嬩笉鍐嶅寘鍚?`index.ts`銆?> BaseUI 缁勪欢閫氳繃 `src/components/baseui/index.ts` 瀵煎嚭锛孲erviceUI 缁勪欢閫氳繃 `src/components/serviceui/index.ts` 瀵煎嚭銆?> 鍚勮鍥炬枃浠剁洿鎺ヤ粠瀵瑰簲鐩綍瀵煎叆鎵€闇€缁勪欢锛堝 `import { BuiPage } from "../../components/baseui"`锛夈€?## 鍩虹 UI 缁勪欢澶嶇敤瑙勫垯 (Base UI Reuse Rules)

鍦?HEROUI 缁勪欢涔嬩笂灏佽涓€灞傚熀纭€ UI 缁勪欢锛圔aseUI锛夛紝鎻愪緵鏇翠究鍒╃殑 API 鍜岄粯璁よ涓猴紝閬垮厤鍦ㄦ瘡涓〉闈㈤噸澶嶇紪鍐欑浉鍚岀殑缁勫悎閫昏緫銆傚叿浣撹鍒欏涓嬶細

1. **灏佽鍘熷垯**锛氬綋澶氫釜椤甸潰閲嶅浣跨敤鍚屼竴 HEROUI 缁勪欢鐨勭粍鍚堟ā寮忥紙渚嬪 Table + ScrollContainer + 鍥哄畾琛ㄥご甯冨眬锛夋椂锛屽簲灏佽涓?BaseUI 缁勪欢锛屾斁鍦?src/components/baseui/ 鐩綍涓?2. **鐩綍缁撴瀯**锛氬湪 src/components/baseui/ 涓嬪垱寤虹粍浠舵枃浠跺す锛屼互 ui-xxx 鍛藉悕锛坘ebab-case锛?   `
   src/components/baseui/
   +-- index.ts
   +-- bui-table/
   |   +-- index.ts
   |   +-- bui-table.tsx
   +-- ...
   `
3. **缁勪欢鍛藉悕**锛氫互 Bui 浣滀负缁勪欢鍓嶇紑锛堝 BuiTable锛夛紝鏂囦欢澶瑰悕涓庣粍浠跺悕瀵瑰簲
4. **Props 绫诲瀷**锛歅rops 绫诲瀷缁熶竴浣跨敤 interface 澹版槑锛屽懡鍚嶆牸寮忎负 BuiXxxProps锛屽０鏄庡湪缁勪欢鏂囦欢椤堕儴
5. **娉涘瀷鏀寔**锛欱aseUI 缁勪欢搴旀敮鎸佹硾鍨嬶紙濡?BuiTable<T>锛夛紝涓嶇粦瀹氬叿浣撴暟鎹被鍨?6. **鍏ュ彛瀵煎嚭**锛歴rc/components/baseui/index.ts 缁熶竴瀵煎嚭鎵€鏈夌粍浠讹紙export { BuiTable } from ./bui-table锛夛紝姣忎釜缁勪欢鏂囦欢澶瑰唴鐨?index.ts 璐熻矗瀵煎嚭璇ョ粍浠讹紙export { BuiTable } from ./bui-table锛?7. **涓嶅彲娣风敤**锛欱aseUI 缁勪欢搴斿彧灏佽涓€灞?HEROUI 缁勪欢锛屼笉鍖呭惈涓氬姟閫昏緫銆傚甫鏈変笟鍔￠€昏緫鐨勭粍浠跺簲鏀惧湪 serviceui 鐩綍涓?<!-- BASEUI-RULES-END -->


<!-- COMPONENT-RULES-START -->
## 缁勪欢璁捐瑙勫垯 (Component Design Rules)

瑙勮寖 React 缁勪欢鐨勫畾涔夋柟寮忋€丳rops 澹版槑鍜岀粨鏋勬ā寮忥紝鍏蜂綋瑙勫垯濡備笅锛?
1. **Props 绫诲瀷**锛歅rops 绫诲瀷缁熶竴浣跨敤 `interface` 澹版槑锛堜笉浣跨敤 `type`锛夛紝鍛藉悕鏍煎紡涓虹粍浠跺悕 + `Props`锛堢ず渚嬶細`UserCardProps`锛夛紝澹版槑鍦ㄧ粍浠舵枃浠堕《閮?2. **ForwardRef**锛氶渶瑕佸澶栨毚闇?DOM 寮曠敤鐨勭粍浠讹紙濡傝〃鍗曡緭鍏ャ€丮odal銆乀ooltip 鍖呰锛変娇鐢?`reverseRef` 鍖呰９锛屽苟鍚屾椂瀵煎嚭瀵瑰簲鐨?Ref 绫诲瀷
3. **Children 绫诲瀷**锛歚children` 缁熶竴浣跨敤 `React.ReactNode` 绫诲瀷锛屼粎鍦ㄩ渶绾︽潫瀛愬厓绱犳暟閲忔垨绫诲瀷鏃朵娇鐢ㄦ洿鍏蜂綋鐨勭被鍨?4. **鑱岃矗鍗曚竴**锛氭瘡涓粍浠跺彧璐熻矗涓€涓姛鑳藉煙锛涘崟鏂囦欢瓒呰繃 300 琛屾垨鍏虫敞鐐硅秴杩?3 涓椂锛屽簲鎷嗗垎涓烘洿灏忕殑瀛愮粍浠?5. **娓叉煋浼樺寲**锛氶绻侀噸娓叉煋鐨勫満鏅紙鍒楄〃椤广€佸疄鏃舵暟鎹潰鏉匡級浣跨敤 `React.memo` 鍖呰９绾睍绀虹粍浠讹紝鍥炶皟浣跨敤 `useCallback` 鎴?`useMemo` 绋冲畾寮曠敤
6. **榛樿 Props**锛氫娇鐢ㄩ粯璁よВ鏋勫€硷紙`const Card = ({ title = "榛樿鏍囬", size = "md" }: CardProps) => ...`锛夛紝涓嶄緷璧?`defaultProps`
7. **鑷畾涔?Hook**锛氭秹鍙婃暟鎹幏鍙栥€佽〃鍗曢€昏緫銆佹祻瑙堝櫒 API 绛夊彲澶嶇敤閫昏緫浼樺厛鎶藉彇涓鸿嚜瀹氫箟 Hook锛堟斁鍦?`src/hooks/` 鐩綍涓嬶級锛屼繚鎸佺粍浠朵唬鐮佺畝娲?<!-- COMPONENT-RULES-END -->

<!-- TYPESCRIPT-RULES-START -->
## TypeScript 绫诲瀷绾﹀畾 (TypeScript Conventions)

瑙勮寖 TypeScript 绫诲瀷瀹氫箟鐨勭粍缁囨柟寮忓拰浣跨敤涔犳儻锛屽叿浣撹鍒欏涓嬶細

1. **绫诲瀷鏂囦欢浣嶇疆**锛氭墍鏈夊叡浜被鍨嬪畾涔夐泦涓斁鍦?`src/types/` 鐩綍涓嬶紝鎸夋ā鍧楁媶鍒嗕负鐙珛鏂囦欢
   ```
   src/types/
   鈹溾攢鈹€ index.ts              # 鍏ㄥ眬鍏变韩绫诲瀷瀵煎嚭鍏ュ彛
   鈹溾攢鈹€ user.ts               # 鐢ㄦ埛妯″潡绫诲瀷
   鈹溾攢鈹€ api.ts                # API 閫氱敤绫诲瀷锛堝垎椤点€佽姹?鍝嶅簲鍖呰绛夛級
   鈹溾攢鈹€ common.ts             # 閫氱敤绫诲瀷宸ュ叿
   鈹斺攢鈹€ ...
   ```
2. **Props 绫诲瀷灏辫繎澹版槑**锛氱粍浠?Props 绫诲瀷灏辫繎澹版槑鍦ㄧ粍浠舵枃浠朵腑锛堝懡鍚?`XxxProps`锛夛紝浠呭湪澶氫釜缁勪欢闂村叡浜椂鎵嶆彁鍙栧埌 `src/types/`
3. **interface 涓?type 鐨勯€夋嫨**锛?   - `interface` 鐢ㄤ簬鎻忚堪瀵硅薄缁撴瀯锛屾敮鎸佹墿灞曪紙`extends`锛?   - `type` 鐢ㄤ簬鑱斿悎绫诲瀷锛坄|`锛夈€佷氦鍙夌被鍨嬶紙`&`锛夈€佸伐鍏风被鍨嬶紙`Pick`銆乣Omit` 绛夛級銆佸厓缁勩€佸熀鏈被鍨嬪埆鍚?4. **鍛藉悕瑙勮寖**锛?   - 鎺ュ彛锛歚PascalCase`锛屾棤 `I` 鍓嶇紑锛堢ず渚嬶細`UserProfile`銆乣ApiResponse`锛?   - 绫诲瀷鍒悕锛歚PascalCase`锛堢ず渚嬶細`UserRole`銆乣Nullable<T>`锛?   - 鏋氫妇锛歚PascalCase`锛屾灇涓惧€间娇鐢?`PascalCase`锛堢ず渚嬶細`Role.Admin`锛?   - Props 绫诲瀷锛氱粍浠跺悕 + `Props` 鍚庣紑锛堢ず渚嬶細`UserCardProps`锛?   - API 璇锋眰/鍝嶅簲锛歚XxxRequest` / `XxxResponse`
5. **涓ユ牸妯″紡**锛氱鐢?`any` 绫诲瀷锛屾棤娉曠‘瀹氱被鍨嬫椂浣跨敤 `unknown` 骞堕厤鍚堢被鍨嬪畧鍗敹绐?6. **娉涘瀷鍛藉悕**锛氭硾鍨嬪弬鏁颁娇鐢ㄥぇ鍐欏崟瀛楁瘝锛坄T`銆乣U`銆乣V`锛夋垨鏈夊惈涔夌殑澶у啓椹煎嘲锛坄TData`銆乣TResponse`锛?7. **绫诲瀷瀵煎嚭**锛氱被鍨嬪畾涔変娇鐢?`export` 鍏抽敭瀛楃洿鎺ュ鍑猴紝绂佹鍦ㄥ崟鐙殑鏂囦欢搴曢儴缁熶竴瀵煎嚭
<!-- TYPESCRIPT-RULES-END -->

<!-- NAMING-RULES-START -->
## 鍛藉悕瑙勮寖 (Naming Conventions)

鎵€鏈夌洰褰曞悕鍜屾枃浠跺悕缁熶竴浣跨敤 `kebab-case`锛屽叿浣撹鍒欏涓嬶細

1. **鐩綍鍛藉悕**锛氭墍鏈夌洰褰曠粺涓€浣跨敤 `kebab-case`锛堢ず渚嬶細`user-profile/`銆乣data-table/`銆乣service-ui/`锛夛紝淇濇寔灏忓啓 + 杩炲瓧绗﹂鏍?2. **鏂囦欢鍛藉悕**锛氭墍鏈夋枃浠跺熀纭€鍚嶏紙涓嶅惈鎵╁睍鍚嶏級缁熶竴浣跨敤 `kebab-case`锛屾墿灞曞悕淇濇寔鍘熸湁鏍煎紡锛?   - 缁勪欢鏂囦欢锛歚user-card.tsx`銆乣dashboard-panel.tsx`锛堢粍浠跺唴閮ㄥ鍑哄悕浠嶄负 PascalCase锛歚UserCard`銆乣DashboardPanel`锛?   - Hook 鏂囦欢锛歚use-auth.ts`銆乣use-pagination.ts`锛圚ook 鍐呴儴瀵煎嚭鍚嶄粛涓?useXxx锛歚useAuth`銆乣usePagination`锛?   - 宸ュ叿鍑芥暟鏂囦欢锛歚format-date.ts`銆乣parse-url.ts`锛堝唴閮ㄥ鍑哄悕浠嶄负 camelCase锛歚formatDate`銆乣parseUrl`锛?   - 绫诲瀷瀹氫箟鏂囦欢锛歚user.ts`銆乣api.ts`
   - API 妯″潡鏂囦欢锛歚request.ts`銆乣user-api.ts`
3. **鍐呴儴瀵煎嚭鍚嶄笉鍙楀奖鍝?*锛氭枃浠跺唴閮ㄧ殑瀵煎嚭鏍囪瘑绗︿粛閬靛惊鍚勮嚜鐨勮瑷€/妗嗘灦鎯緥锛圧eact 缁勪欢鐢?PascalCase銆丠ook 鐢?`useXxx`銆佸伐鍏峰嚱鏁扮敤 camelCase锛夛紝浠呮枃浠剁郴缁熷眰闈㈢殑鍚嶇О缁熶竴涓?`kebab-case`
4. **甯搁噺涓庢灇涓?*锛氬叏灞€甯搁噺浣跨敤 `UPPER_SNAKE_CASE`锛堢ず渚嬶細`MAX_RETRY_COUNT`銆乣API_BASE_URL`锛夛紝妯″潡绾у父閲忎娇鐢?`camelCase`
5. **CSS 绫诲悕**锛氫娇鐢?kebab-case锛圱ailwind 椋庢牸鑷姩閫傞厤锛?<!-- NAMING-RULES-END -->

<!-- CODE-SPLITTING-RULES-START -->
## 浠ｇ爜鎷嗗垎瑙勫垯 (Code Splitting Rules)

涓ョ灏嗘墍鏈変唬鐮佸爢鍏ュ悓涓€涓枃浠朵腑锛屽繀椤诲悎鐞嗘媶鍒嗘枃浠跺苟杩涜鍒嗗寘锛屽叿浣撹鍒欏涓嬶細

1. **鎸夊姛鑳?棰嗗煙鎷嗗垎**锛氭瘡涓粍浠躲€侀〉闈€乭ook銆佸伐鍏峰嚱鏁板潎搴旂嫭绔嬫垚鏂囦欢锛屾枃浠跺悕涓庡鍑哄唴瀹瑰搴旓紙濡?`useAuth.ts` 瀵煎嚭 `useAuth`锛?2. **鍗曟枃浠惰亴璐ｅ崟涓€**锛氫竴涓枃浠跺彧鍋氫竴浠朵簨銆傜粍浠舵枃浠跺彧鍖呭惈缁勪欢瀹氫箟鍜岃缁勪欢涓撶敤鐨勫皬鍨嬭緟鍔╅€昏緫锛涢€氱敤宸ュ叿鍑芥暟銆佺被鍨嬪畾涔夈€佸父閲忋€丄PI 璋冪敤绛夊簲鍒嗗埆鎶藉彇鍒扮嫭绔嬬洰褰?3. **鍒嗗寘绛栫暐**锛氫娇鐢?Vite 鐨勮矾鐢辨噿鍔犺浇锛坄React.lazy` + `import()`锛夋寜椤甸潰鍒嗗寘锛岄伩鍏嶉灞忓姞杞藉叏閲忎唬鐮?4. **鐩綍灞傜骇鎵佸钩**锛歚src/` 涓嬫寜涓氬姟妯″潡鍒涘缓瀛愮洰褰曪紙濡?`src/components/`銆乣src/pages/`銆乣src/hooks/`銆乣src/utils/`銆乣src/api/`銆乣src/types/` 绛夛級锛屾瘡涓ā鍧楃洰褰曚笅鎸夋枃浠舵媶鍒嗭紝涓嶅祵濂楄秴杩?3 灞?5. **鍏叡妯″潡鎻愬彇**锛氬涓粍浠跺叡浜殑浠ｇ爜锛堢被鍨嬨€佸父閲忋€佸伐鍏峰嚱鏁般€丄PI 灏佽锛夊繀椤绘彁鍙栧埌鍏叡鐩綍涓嬪鐢紝绂佹澶嶅埗绮樿创
<!-- CODE-SPLITTING-RULES-END -->

<!-- API-RULES-START -->
## API 璇锋眰瑙勫垯 (API Request Rules)

浣跨敤 axios 灏佽 HTTP 璇锋眰灞傦紝缁熶竴绠＄悊璇锋眰銆佸搷搴斿拰閿欒澶勭悊锛屽叿浣撹鍒欏涓嬶細

1. **璇锋眰灏佽**锛氬湪 `src/api/` 涓嬪垱寤轰竴涓?`request.ts`锛堟垨 `http.ts`锛変綔涓?axios 瀹炰緥灏佽锛岀粺涓€閰嶇疆 baseURL銆佽秴鏃舵椂闂淬€佽姹?鍝嶅簲鎷︽埅鍣?2. **妯″潡鍖栫粍缁?*锛歚src/api/` 涓嬫寜涓氬姟妯″潡鍒涘缓瀛愮洰褰曪紝姣忎釜妯″潡鐩綍鍐呭寘鍚竴涓?`index.ts` 浣滀负璇ユā鍧楃殑 API 鍏ュ彛锛屽鏋滄ā鍧楀鏉傚彲棰濆鎷嗗垎鏂囦欢
   ```
   src/api/
   鈹溾攢鈹€ request.ts              # axios 瀹炰緥灏佽
   鈹溾攢鈹€ user/
   鈹?  鈹斺攢鈹€ index.ts            # 鐢ㄦ埛妯″潡 API
   鈹溾攢鈹€ dashboard/
   鈹?  鈹溾攢鈹€ index.ts            # 鐪嬫澘妯″潡 API 鍏ュ彛
   鈹?  鈹斺攢鈹€ charts.ts           # 鍥捐〃鐩稿叧 API锛堝彲閫夋媶鍒嗭級
   鈹斺攢鈹€ ...
   ```
3. **閿欒澶勭悊**锛歛xios 瀹炰緥鐨勫搷搴旀嫤鎴櫒涓粺涓€澶勭悊涓氬姟閿欒锛岄粯璁や粠 `response.data.message` 涓鍙栭敊璇俊鎭紝骞舵敮鎸佸湪瀹炰緥鍖栨椂閫氳繃鍙傛暟鑷畾涔夋秷鎭瓧娈靛悕锛堝 `errorMessageField: 'message'`锛?4. **Loading 鐘舵€?*锛氭暟鎹姞杞借繃绋嬩腑浣跨敤 HeroUI 鐨?`<Skeleton>` 缁勪欢灞曠ず楠ㄦ灦灞忥紝鏇夸唬浼犵粺鐨?loading spinner锛涙瘡涓垪琛?璇︽儏鍖哄煙搴旀湁瀵瑰簲鐨勯鏋跺睆缁勪欢
5. **璇锋眰/鍝嶅簲绫诲瀷**锛氭瘡涓?API 妯″潡鏂囦欢搴斿畾涔夊搴旂殑璇锋眰鍙傛暟绫诲瀷鍜屽搷搴旀暟鎹被鍨嬶紝瀵煎嚭缁欑粍浠朵娇鐢?<!-- API-RULES-END -->

<!-- STATE-RULES-START -->
## 鍏ㄥ眬鐘舵€佺鐞嗚鍒?(State Management Rules)

浣跨敤 Jotai 绠＄悊鍏ㄥ眬鐘舵€侊紝鎸夋ā鍧楃粍缁囩姸鎬佹枃浠讹紝鍏蜂綋瑙勫垯濡備笅锛?
1. **鐘舵€佺洰褰曠粨鏋?*锛氭墍鏈夊叏灞€鐘舵€佹枃浠堕泦涓斁鍦?`src/stores/` 鐩綍涓嬶紝鎸変笟鍔℃ā鍧楀垱寤哄搴旂殑瀛愮洰褰?   ```
   src/stores/
   鈹溾攢鈹€ index.ts              # 鍏ㄥ眬鐘舵€佸鍑哄叆鍙?   鈹溾攢鈹€ auth/
   鈹?  鈹斺攢鈹€ index.ts          # 璁よ瘉鐘舵€侊紙鐢ㄦ埛淇℃伅銆乀oken 绛夛級
   鈹溾攢鈹€ theme/
   鈹?  鈹斺攢鈹€ index.ts          # 涓婚鐘舵€侊紙鏆楅粦妯″紡銆佷富棰樿壊绛夛級
   鈹斺攢鈹€ sidebar/
       鈹斺攢鈹€ index.ts          # 渚ц竟鏍忕姸鎬侊紙灞曞紑/鎶樺彔锛?   ```
2. **Atom 鍛藉悕**锛氫娇鐢?`camelCase` + `Atom` 鍚庣紑锛堢ず渚嬶細`userAtom`銆乣themeAtom`銆乣isSidebarOpenAtom`锛夛紝瀵煎嚭鏃剁洿鎺ュ鍑哄師瀛愬€?3. **娲剧敓鐘舵€?*锛氫娇鐢?`atom(get => ...)` 鎴?`atom((get, set) => ...)` 瀹氫箟娲剧敓鐘舵€侊紝灏嗚绠楅€昏緫闆嗕腑鍦?stores 灞傦紝閬垮厤鍦ㄧ粍浠朵腑閲嶅鎺ㄥ
4. **璇诲啓鍒嗙**锛氬彧璇诲師瀛愬拰鍙啓鍘熷瓙鍒嗗紑瀹氫箟锛涗慨鏀瑰叡浜姸鎬佺殑閫昏緫灏佽鍦?stores 妯″潡涓紙瀵煎嚭鑷畾涔変慨鏀瑰嚱鏁帮級锛屼笉鍦ㄧ粍浠朵腑鐩存帴璋冪敤 `useSetAtom` 鍐欏叆澶嶆潅鐘舵€?5. **寮傛鐘舵€?*锛氫娇鐢?`atomWithQuery`锛堥厤鍚?TanStack Query锛夋垨 `loadable` 澶勭悊寮傛鏁版嵁
6. **妯″潡瀵煎嚭**锛氭瘡涓ā鍧楁枃浠跺す鐨?`index.ts` 瀵煎嚭璇ユā鍧楁墍鏈夊師瀛愬拰鎿嶄綔鍑芥暟锛宍src/stores/index.ts` 姹囨€诲鍑烘墍鏈夋ā鍧?<!-- STATE-RULES-END -->

<!-- ROUTING-RULES-START -->
## 璺敱缁勭粐瑙勫垯 (Routing Organization Rules)

浣跨敤 `react-router` 绠＄悊璺敱锛屾寜妯″潡鍒嗙粍缁勭粐锛屾敮鎸佽矾鐢卞畧鍗拰鎳掑姞杞斤紝鍏蜂綋瑙勫垯濡備笅锛?
1. **璺敱鐩綍缁撴瀯**锛氭墍鏈夎矾鐢遍厤缃泦涓斁鍦?`src/routes/` 鐩綍涓嬶紝鎸夋ā鍧楀垎鏂囦欢澶圭粍缁囷細
   ```
   src/routes/
   鈹溾攢鈹€ index.ts                    # 涓昏矾鐢辨眹鎬伙紝瀹氫箟璺敱瀹堝崼鍜岄《灞傝矾鐢卞竷灞€
   鈹溾攢鈹€ guards.ts                   # 璺敱瀹堝崼锛堣璇併€佹潈闄愮瓑锛?   鈹溾攢鈹€ dashboard/
   鈹?  鈹溾攢鈹€ index.ts                # 鐪嬫澘妯″潡璺敱姹囨€?   鈹?  鈹溾攢鈹€ overview.tsx            # 姒傝椤佃矾鐢憋紙鎳掑姞杞界粍浠讹級
   鈹?  鈹斺攢鈹€ analytics.tsx           # 鍒嗘瀽椤佃矾鐢?   鈹溾攢鈹€ user/
   鈹?  鈹溾攢鈹€ index.ts                # 鐢ㄦ埛妯″潡璺敱姹囨€?   鈹?  鈹溾攢鈹€ list.tsx                # 鐢ㄦ埛鍒楄〃椤佃矾鐢?   鈹?  鈹斺攢鈹€ detail.tsx              # 鐢ㄦ埛璇︽儏椤佃矾鐢憋紙鍚祵濂楀瓙璺敱锛?   鈹斺攢鈹€ ...
   ```
2. **妯″潡璺敱姹囨€?*锛氭瘡涓ā鍧楁枃浠跺す鐨?`index.ts` 瀵煎嚭璇ユā鍧椾笅鐨勬墍鏈夎矾鐢遍厤缃紙`RouteObject` 鏁扮粍锛夛紝鏀寔宓屽璺敱鍦ㄦā鍧楀唴閫氳繃瀛愭枃浠惰繘涓€姝ユ媶鍒?3. **涓昏矾鐢辨眹鎬?*锛歚src/routes/index.ts` 姹囨€绘墍鏈夋ā鍧楄矾鐢憋紝閰嶇疆璺敱瀹堝崼銆佸竷灞€缁勪欢鍖呰９銆?04 椤甸潰绛夊叏灞€閫昏緫鈥斺€旀洿鎹㈤」鐩椂鍙渶鏇挎崲姝ゆ枃浠跺拰妯″潡鏂囦欢澶瑰嵆鍙鐢ㄦ暣浣撹矾鐢辨灦鏋?4. **璺敱瀹堝崼**锛氬畧鍗€昏緫闆嗕腑鍐欏湪 `guards.ts` 涓紝鍏峰閫氱敤鎬р€斺€旈€氳繃楂橀樁缁勪欢鎴栫粍浠跺皝瑁咃紙`RequireAuth`銆乣RequirePermission`锛夊疄鐜帮紝鍙湪涓昏矾鐢辨眹鎬荤殑 `loader` 鎴栫粍浠剁骇瀹堝崼涓皟鐢?5. **閫氱敤鎬ц姹?*锛氳矾鐢辨灦鏋勫簲涓庨」鐩笟鍔¤В鑰︼紝鍋氬埌鏂伴」鐩彧闇€澶嶅埗 `src/routes/` 骞舵浛鎹㈡ā鍧楁枃浠跺拰瀹堝崼鎺ュ叆鐐瑰嵆鍙娇鐢?6. **鎳掑姞杞?*锛氭瘡涓〉闈娇鐢?`React.lazy(() => import('./xxx'))` 瀹炵幇鎸夐渶鍔犺浇锛岄厤鍚?`<Suspense>` 灞曠ず楠ㄦ灦灞?<!-- ROUTING-RULES-END -->

<!-- LAYOUT-PAGE-RULES-START -->
## Layout 涓?Page 灏佽瑙勫垯 (Layout & Page Component Rules)

涓轰繚璇侀〉闈㈣瑙変竴鑷存€э紝蹇呴』灏佽 Layout 鍜?Page 缁勪欢閰嶅悎浣跨敤锛?
1. **Layout 灏佽**锛氬湪 `src/layouts/` 涓嬪畾涔夊竷灞€缁勪欢锛堝 `MainLayout`銆乣AuthLayout`锛夛紝缁熶竴绠＄悊瀵艰埅鏍忋€佷晶杈规爮銆侀〉鑴氥€佸唴瀹瑰尯瀹瑰櫒绛夊叕鍏辩粨鏋?2. **Page 灏佽**锛氬湪灏佽 Layout 鏃讹紝寤鸿鍚屾灏佽涓€涓?`Page` 缁勪欢锛堝彲鏀惧湪 `src/components/` 鎴栨瘡涓?Layout 鐩綍涓嬶級锛屼綔涓洪〉闈㈢骇鍐呭瀹瑰櫒锛岀粺涓€绠＄悊浠ヤ笅椤甸潰鍏叡閫昏緫锛?   - 椤甸潰鏍囬 `title`
   - 椤甸潰鍐呰竟璺?`padding`
   - 椤甸潰鏈€澶у搴?`maxWidth`
   - 闈㈠寘灞?`breadcrumbs`
3. **浣跨敤鏂瑰紡**锛氭瘡涓〉闈㈣矾鐢辩粍浠舵寜 `Page` 缁勪欢鍖呰９鍏蜂綋鍐呭锛屼繚鎸佹瘡涓〉闈㈢殑闂磋窛銆佹爣棰樺眰绾с€佸竷灞€琛屼负涓€鑷?4. **灞傜骇鍏崇郴**锛歚Layout > Page > 椤甸潰鍏蜂綋鍐呭`锛孡ayout 璐熻矗鏁翠綋妗嗘灦锛孭age 璐熻矗鍐呭鍖哄煙鍐呯殑涓€鑷存€?<!-- LAYOUT-PAGE-RULES-END -->
<!-- TOOLBAR-LAYOUT-RULES-START -->
## 工具栏布局规则 (Toolbar Layout Rules)

在后台管理系统的列表页中，操作按钮（新建、导出、批量删除等）和筛选条件（搜索框、下拉菜单等）的布局遵循以下规则：

1. **标准布局：左操作右筛选** — 操作按钮排在左侧，筛选条件排在右侧，使用 justify-between 撑开两组内容。具体布局如下：
   `
   [新建] [导出] [批量删除]          [搜索...] [状态筛选] [日期筛选]
   `

2. **左侧放操作按钮的理由**：
   - **阅读顺序**：用户从左到右阅读，优先看到最重要的操作（新建、新增等核心行为）
   - **层级关系**：操作按钮是对数据的"行为"，优先级高于"筛选"，放在左侧更突出
   - **Fitts 定律**：左边缘是屏幕的自然起始点，用户容易快速定位

3. **右侧放筛选条件的理由**：
   - **辅助性质**：筛选是"缩小范围"的辅助功能，不是主操作，放在右侧不抢占视觉焦点
   - **与内容对齐**：表格/列表的列头通常也有筛选图标在右侧，上下呼应，视觉流自然
   - **搜索习惯**：用户习惯在右上角找搜索框，符合多数网站的设计惯例

4. **可互换的例外场景**：当页面的核心场景是以搜索/筛选为主（如日志查看器、数据分析报表），可以交换布局：
   `
   [搜索框] [时间范围] [状态筛选]          [新建] [导出]
   `
   此时筛选是用户的主要操作，新建反而变成次要功能。

5. **通用判断原则**：
   - 高频 > 低频：更常用的功能放左边
   - 主要 > 辅助：核心操作放左边，辅助功能放右边
   - 新建/创建类操作永远在最左：这是几乎所有后台系统的默认约定

6. **实现方式**：使用 BaseUI 的 BuiToolbar 组件封装工具栏布局，所有列表页统一使用该组件，修改布局只需改组件本身：
   **标准布局（左操作右筛选）**：
   ```tsx
   import { BuiToolbar } from "../../components/baseui";

   <BuiToolbar
     left={<Button>新建</Button>}
     right={<><SearchField /><Select /></>}
   />
   ```

   **反转布局（左筛选右操作）**——改 `reverse` 即可，无需动页面：
   ```tsx
   <BuiToolbar
     reverse
     left={<SearchField />}
     right={<Button>新建</Button>}
   />
   ```

   组件位于 `src/components/baseui/bui-toolbar/`，接受 `left`、`right`、`reverse`、`className` 四个 prop。
   `reverse` 为 `true` 时交换左右两组的位置，无需改动每个页面的调用代码即可整体切换布局方向。
<!-- TOOLBAR-LAYOUT-RULES-END -->

<!-- ICON-RULES-START -->
## 鍥炬爣浣跨敤瑙勫垯 (Icon Usage Rules)

蹇呴』浠?`lucide-react`銆乣@heroicons/react` 鎴?`@gravity-ui/icons` 鍥炬爣搴撲腑鎸戦€夊悎閫傜殑鍥炬爣锛屼弗绂佽嚜缁?SVG 鍥炬爣鏇夸唬锛屽叿浣撹鍒欏涓嬶細

1. **鏈?HeroUI 绀轰緥鏃朵紭鍏?Lucide**锛氳嫢褰撳墠缁勪欢鍦?HeroUI 鏂囨。涓瓨鍦ㄤ娇鐢ㄧず渚嬩笖绀轰緥涓娇鐢ㄤ簡鍥炬爣锛屽簲浼樺厛浣跨敤 `lucide-react`锛堜笌 HeroUI 瀹樻柟绀轰緥淇濇寔涓€鑷达級
2. **鏃?HeroUI 绀轰緥鏃堕€?Heroicons 鎴?Gravity UI**锛氳嫢 HeroUI 鏂囨。鏃犳缁勪欢绀轰緥鎴栦笉娑夊強鍥炬爣锛屽彲鏍规嵁闇€瑕侀€夌敤 `@heroicons/react` 鎴?`@gravity-ui/icons`
3. **鍚屼竴鍖哄煙椋庢牸缁熶竴**锛氬悓涓€瑙嗚鍖哄煙鎴栧悓涓€缁勪欢闆嗗悎鍐咃紙濡備晶杈瑰鑸爮銆佸悓涓€琛ㄦ牸鐨勬搷浣滃垪銆佸悓涓€琛ㄥ崟鐨勬寜閽粍锛夛紝蹇呴』涓斿彧鑳戒娇鐢ㄥ悓涓€涓浘鏍囧簱鐨勫浘鏍囷紝涓ョ娣风敤涓嶅悓鍥炬爣搴撻€犳垚椋庢牸涓嶄竴鑷?4. **绂佹鑷粯鍥炬爣**锛氫弗绂佹墜鍔ㄧ紪鍐?SVG 璺緞鎴栦娇鐢ㄥ唴鑱?SVG 浣滀负鍔熻兘鍥炬爣锛堜笁涓浘鏍囧簱鍧囦笉鍖呭惈鐨勬瀬鐗规畩鍦烘櫙闄ゅ锛?5. **寮曞叆鏂瑰紡**锛氫娇鐢?Tree-shakable 鐨勫懡鍚嶅鍏ユ柟寮忥紝渚嬪锛?   - `import { Search } from "lucide-react"`
   - `import { AcademicCapIcon } from "@heroicons/react/24/outline"`
   - `import { Gear } from "@gravity-ui/icons"`
6. **鍛藉悕瑙勮寖**锛?   - Lucide锛歅ascalCase锛堝 `Search`銆乣Menu`銆乣X`锛夛紝纭繚涓?`lucide-react` 鐨勫鍑哄悕瀹屽叏涓€鑷?   - Heroicons锛歅ascalCase + `Icon` 鍚庣紑锛堝 `MagnifyingGlassIcon`銆乣UserCircleIcon`锛夛紝纭繚涓?`@heroicons/react` 鐨勫鍑哄悕瀹屽叏涓€鑷?   - Gravity UI Icons锛歅ascalCase锛堝 `Gear`銆乣ArrowRight`锛夛紝纭繚涓?`@gravity-ui/icons` 鐨勫鍑哄悕瀹屽叏涓€鑷?<!-- ICON-RULES-END -->

<!-- COMMENT-RULES-START -->
## 浠ｇ爜娉ㄩ噴瑙勫垯 (Code Comment Rules)

鎵€鏈夌紪鍐欐垨鏇存柊鐨勪唬鐮佸繀椤诲寘鍚灏芥敞閲婏紝閬靛惊浠ヤ笅瑙勫垯锛?
1. **娉ㄩ噴蹇呴』璇﹀敖**锛氭瘡涓嚱鏁般€佺粍浠躲€佸叧閿€昏緫鍧椼€佸鏉傝〃杈惧紡銆佺被鍨嬪畾涔夈€丄PI 璋冪敤銆佺姸鎬佺鐞嗘祦绋嬬瓑閮藉繀椤绘坊鍔犳敞閲婏紝璇存槑鍏朵綔鐢ㄣ€佸弬鏁板惈涔夈€佽繑鍥炲€笺€佹敞鎰忎簨椤?2. **鍙岃娉ㄩ噴**锛氭敞閲婂繀椤诲悓鏃跺寘鍚腑鏂囷紙鐢ㄦ埛褰撳墠浣跨敤鐨勮瑷€锛夊拰鑻辫锛屼簩鑰呯己涓€涓嶅彲锛屾牸寮忎负 `涓枃 / English`
    **娉ㄦ剰**锛氭瑙勫垯浠呴€傜敤浜庝唬鐮佹敞閲婏紙鏂囦欢澶撮儴娉ㄩ噴銆佸嚱鏁拌鏄庛€佽鍐呴€昏緫瑙ｉ噴绛夛級锛屼笉閫傜敤浜庣敤鎴风晫闈㈡枃鏈紙椤甸潰鏍囬銆佹寜閽枃瀛椼€佸鑸爣绛俱€佹彁绀轰俊鎭瓑锛夈€俇I 鏂囨湰搴斾娇鐢ㄧ畝浣撲腑鏂囷紝鏃犻渶闄勫姞鑻辨枃缈昏瘧銆?3. **鐗规畩渚嬪**锛氬鏋滅敤鎴蜂娇鐢ㄧ殑璇█鏈韩灏辨槸鑻辫锛屽垯娉ㄩ噴鍙渶瑕佽嫳璇?4. **鑻辫鏄€氱敤璇█**锛氳嫳璇綔涓哄浗闄呴€氱敤鎶€鏈瑷€锛屾坊鍔犺嫳璇敞閲婃槸涓轰簡纭繚鏉ヨ嚜鍏ㄤ笘鐣岀殑绋嬪簭鍛橀兘鑳界悊瑙ｅ拰鍏卞悓缁存姢浠ｇ爜
5. **娉ㄩ噴浣嶇疆**锛氬嚱鏁?缁勪欢瀹氫箟涓婃柟浣跨敤鍧楁敞閲婏紙`/** ... */`锛夛紝鍏抽敭閫昏緫琛屼娇鐢ㄨ鍐呮敞閲婏紙`// ...`锛夛紝鏂囦欢椤堕儴搴斿寘鍚枃浠跺姛鑳借鏄?6. **鍐呭瑕佹眰**锛氭敞閲婂簲瑙ｉ噴"涓轰粈涔堣繖涔堝仛"鑰岄潪"鍋氫簡浠€涔?锛屽悗鑰呴€氳繃浠ｇ爜鏈韩鍗冲彲琛ㄨ揪銆傞亣鍒板鏉傜畻娉曘€侀潪鐩磋鐨勪笟鍔¤鍒欍€佸伐浣滃尯鍙橀€氭柟妗堟椂锛屽繀椤婚檮涓婂畬鏁磋儗鏅鏄?<!-- COMMENT-RULES-END -->

<!-- ENCODING-TOOLS-RULES-START -->
## 鏂囦欢缂栫爜涓庝慨鏀瑰伐鍏疯鍒?(File Encoding & Modification Tool Rules)

涓轰繚璇佹枃浠剁紪鐮佷竴鑷存€у拰閬垮厤缂栫爜鎹熷潖锛屽繀椤婚伒瀹堜互涓嬭鍒欙細

1. **寮哄埗 UTF-8 缂栫爜**锛氶」鐩腑鎵€鏈夋簮鏂囦欢锛?ts銆?tsx銆?css銆?json銆?md銆?html 绛夛級蹇呴』浣跨敤 UTF-8 缂栫爜锛堟棤 BOM锛夛紝涓ョ浣跨敤 GBK銆丟B2312銆丩atin-1銆乁TF-8 with BOM 绛夊叾浠栫紪鐮?2. **绂佹浣跨敤 PowerShell 淇敼鏂囦欢**锛歅owerShell 鍦ㄥ鐞?UTF-8 鏂囦欢鏃跺瓨鍦ㄧ紪鐮侀棶棰橈紙榛樿缂栫爜涓嶄竴鑷淬€丅OM 閲嶅鍐欏叆銆丂 绗﹀彿瑙ｆ瀽鍐茬獊绛夛級锛屼弗绂佷娇鐢?PowerShell 鐩存帴璇诲啓椤圭洰婧愪唬鐮佹枃浠?3. **鎺ㄨ崘浣跨敤 Node.js 鎴?Python 淇敼鏂囦欢**锛氭枃浠朵慨鏀规搷浣滃簲浼樺厛浣跨敤浠ヤ笅鏂瑰紡锛?   - Node.js `fs.readFileSync` / `fs.writeFileSync`锛堟寚瀹?`utf-8` 缂栫爜锛屾棤 BOM锛?   - Python `pathlib.Path.read_text('utf-8')` / `write_text('utf-8')`
4. **閬垮厤娣风敤涓嶅悓绯荤粺鐨勬崲琛岀**锛氫慨鏀规枃浠舵椂淇濇寔鏂囦欢鍘熸湁鐨勬崲琛岀椋庢牸锛圠F 鎴?CRLF锛夛紝涓嶅簲闅忔剰娣风敤鎴栬浆鎹?<!-- ENCODING-TOOLS-RULES-END -->
<!-- TEMP-FILES-RULES-START -->
## 涓存椂鏂囦欢瑙勫垯 (Temporary Files Rules)

瑙勮寖涓存椂鏂囦欢鐨勫垱寤哄拰娓呯悊娴佺▼锛屽叿浣撹鍒欏涓嬶細

1. **缁熶竴瀛樻斁浣嶇疆**锛氭墍鏈変复鏃舵枃浠讹紙濡傝皟璇曡剼鏈€佷复鏃舵祴璇曟枃浠剁瓑锛夊繀椤诲垱寤哄湪椤圭洰鏍圭洰褰曚笅鐨?`_temps/` 鏂囦欢澶逛腑锛屼弗绂佸湪 `src/`銆乣public/` 绛夋簮鐮佺洰褰曚腑鍒涘缓涓存椂鏂囦欢
2. **瀵硅瘽缁撴潫鍓嶆竻鐞?*锛氭瘡杞璇濈粨鏉熷墠锛屽繀椤绘竻鐞?`_temps/` 鐩綍涓嬫墍鏈夋枃浠讹紝纭繚涓嶇暀涓嬩换浣曚复鏃舵枃浠?3. **鍛藉悕瑙勮寖**锛氫复鏃舵枃浠跺悕搴斿叿鏈夋弿杩版€э紝渚夸簬璇嗗埆鐢ㄩ€旓紙渚嬪 `fix-detail-page.mjs`锛夛紝閬垮厤浣跨敤鏃犳剰涔夌殑鍚嶇О
4. **.gitignore**锛歚_temps/` 鐩綍宸叉坊鍔犲埌 `.gitignore` 涓紝閬垮厤涓存椂鏂囦欢琚彁浜ゅ埌鐗堟湰鎺у埗
<!-- TEMP-FILES-RULES-END -->


<!-- ENV-RULES-START -->
## 鐜鍙橀噺瑙勫垯 (Environment Variables Rules)

瑙勮寖鐜鍙橀噺鐨勫懡鍚嶃€佺粍缁囧拰浣跨敤鏂瑰紡锛屽叿浣撹鍒欏涓嬶細

1. **Vite 鍓嶇紑**锛氭墍鏈夊墠绔幆澧冨彉閲忓繀椤讳娇鐢?`VITE_` 鍓嶇紑锛圴ite 寮哄埗瑕佹眰锛岄潪 `VITE_` 鍓嶇紑鍙橀噺涓嶄細琚敞鍏ュ埌瀹㈡埛绔唬鐮侊級
2. **鍛藉悕椋庢牸**锛氫娇鐢?`UPPER_SNAKE_CASE`锛屾寜鍒嗙粍鏈夊簭鎺掑垪锛堢ず渚嬶細`VITE_API_BASE_URL`銆乣VITE_API_TIMEOUT`銆乣VITE_APP_TITLE`锛?3. **鍙橀噺鍒嗙粍**锛?   - `VITE_API_*`锛欰PI 鐩稿叧锛坆aseURL銆佽秴鏃舵椂闂淬€佹帴鍙ｅ墠缂€锛?   - `VITE_APP_*`锛氬簲鐢ㄩ厤缃紙绔欑偣鍚嶇О銆佺増鏈彿銆侀粯璁よ瑷€锛?   - `VITE_AUTH_*`锛氳璇佺浉鍏筹紙Token Key銆佺櫥褰曢〉璺緞锛?4. **鐜鏂囦欢**锛氫娇鐢?Vite 鏍囧噯鐜鏂囦欢浣撶郴
   - `.env`锛氭墍鏈夌幆澧冨叡浜殑榛樿鍙橀噺
   - `.env.development`锛氬紑鍙戠幆澧?   - `.env.production`锛氱敓浜х幆澧?   - `.env.local`锛氭湰鍦拌鐩栵紙涓嶆彁浜ゅ埌 Git锛宍.gitignore` 涓凡蹇界暐锛?5. **绫诲瀷澹版槑**锛氬湪 `src/types/env.d.ts` 涓墿灞?`ImportMetaEnv` 鎺ュ彛锛岀‘淇濇墍鏈夌幆澧冨彉閲忔湁瀹屾暣鐨?TypeScript 绫诲瀷鎻愮ず
6. **榛樿鍊?*锛氬湪瑙ｆ瀯璧嬪€兼椂鎻愪緵榛樿鍊硷紝閬垮厤鍥犵幆澧冨彉閲忕己澶卞鑷磋繍琛屾椂閿欒
7. **鏁忔劅淇℃伅**锛欰PI 瀵嗛挜绛夋晱鎰熶俊鎭斁鍦?`.env.local` 涓紝绂佹鎻愪氦鍒?Git
<!-- ENV-RULES-END -->

<!-- ERROR-BOUNDARY-RULES-START -->
## 閿欒杈圭晫瑙勫垯 (Error Boundary Rules)

浣跨敤 Error Boundary 鎹曡幏缁勪欢娓叉煋灞傜殑寮傚父锛岄槻姝㈠崟涓粍浠跺穿婧冨奖鍝嶆暣涓〉闈紝鍏蜂綋瑙勫垯濡備笅锛?
1. **灏佽閫氱敤缁勪欢**锛氬湪 `src/components/` 涓嬪皝瑁呬竴涓€氱敤 `ErrorBoundary` 缁勪欢锛屾敮鎸佽嚜瀹氫箟 fallback UI 鍜岄敊璇洖璋?2. **鏀剧疆灞傜骇**锛氬湪璺敱绾у埆鍜岀嫭绔嬮潰鏉挎ā鍧楃骇鍒垎鍒斁缃?Error Boundary鈥斺€旀瘡涓矾鐢遍〉闈㈢敱 Error Boundary 鍖呰９锛屾ā鍧楀唴鐨勭嫭绔嬮潰鏉夸篃鍙崟鐙寘瑁?3. **Fallback UI**锛氫娇鐢?HeroUI 鐨?`<Alert>` 缁勪欢浣滀负榛樿闄嶇骇 UI锛屽睍绀洪敊璇彁绀哄拰"閲嶈瘯"鎸夐挳锛涢€氳繃鑷畾涔?fallback prop 鏀寔鎸夊満鏅鐩?4. **閿欒鍥炶皟**锛欵rror Boundary 鎹曡幏閿欒鍚庯紝閫氳繃鍥炶皟灏嗛敊璇俊鎭紙閿欒鍚嶃€佹秷鎭€佺粍浠舵爤锛変紶閫掑嚭鍘荤敤浜庝笂鎶ワ紝浣嗕笉闃诲鐢ㄦ埛鎿嶄綔
5. **杈圭晫鑼冨洿**锛氫粎鎹曡幏娓叉煋闃舵鐨勫悓姝ュ紓甯稿拰鐢熷懡鍛ㄦ湡閿欒锛屼笉鎹曡幏浜嬩欢澶勭悊銆佸紓姝ヤ唬鐮佸拰 SSR 涓殑閿欒
<!-- ERROR-BOUNDARY-RULES-END -->

纭繚鎵€鏈?UI 缁勪欢鍏峰鑹ソ鐨勫彲璁块棶鎬э紝閬靛惊鏃犻殰纰嶈璁″師鍒欙紝鍏蜂綋瑙勫垯濡備笅锛?
1. **鏃犳爣绛惧垯蹇呭姞 aria-label / aria-labelledby**锛氫换浣曚氦浜掑紡鍏冪礌锛堟寜閽€佸浘鏍囨寜閽€佽緭鍏ユ銆侀摼鎺ョ瓑锛夊鏋滄病鏈夊彲瑙佹枃瀛楁爣绛撅紝鍒欏繀椤绘坊鍔?`aria-label` 鎴?`aria-labelledby` 灞炴€э紝纭繚灞忓箷闃呰鍣ㄨ兘澶熻瘑鍒叾鐢ㄩ€?2. **SearchField 蹇呴』甯?aria-label**锛歚<SearchField>` 缁勪欢蹇呴』濮嬬粓鍖呭惈 `aria-label` 灞炴€э紙濡?`aria-label="鎼滅储鐢ㄦ埛"`锛夛紝鍥犱负鎼滅储妗嗛€氬父娌℃湁鍙鏍囩
3. **Select 蹇呴』鍏宠仈鏍囩**锛歚<Select>` 缁勪欢蹇呴』鍖呭惈 `<Label>` 瀛愮粍浠讹紝鎴栧湪缁勪欢涓婄洿鎺ヨ缃?`aria-label` 灞炴€э紙濡?`aria-label="鐘舵€佺瓫閫?`锛夛紝涓嶅彲鐪佺暐
4. **Modal / Drawer 蹇呴』甯?aria-label**锛歚<Modal.Dialog>` 鍜?`<Drawer.Dialog>` 缁勪欢蹇呴』璁剧疆 `aria-label` 灞炴€э紙濡?`aria-label="鏂板缓鐢ㄦ埛"`锛夛紝纭繚灞忓箷闃呰鍣ㄨ兘璇嗗埆寮圭獥鐢ㄩ€?5. **琛ㄥ崟鎺т欢鍏宠仈鏍囩**锛氭墍鏈夎〃鍗曟帶浠讹紙Input銆丼elect銆乀extarea 绛夛級蹇呴』鍏宠仈瀵瑰簲鐨?`<label>` 鍏冪礌锛屾垨浣跨敤 HeroUI 缁勪欢鐨?`label` prop 鑷姩鐢熸垚鍏宠仈鏍囩
6. **璇箟鍖栫粨鏋?*锛氫紭鍏堜娇鐢ㄨ涔夊寲 HTML 鍏冪礌锛坄<button>`銆乣<nav>`銆乣<main>`銆乣<aside>` 绛夛級锛屽噺灏戠函 `<div>` / `<span>` 鏋勫缓鐨勪氦浜掔粍浠?7. **鐒︾偣绠＄悊**锛歁odal銆丏rawer銆丏ropdown 绛夊脊鍑哄眰缁勪欢鎵撳紑鏃堕渶鑷姩鑱氱劍鍒板彲鑱氱劍鍏冪礌锛堝叧闂寜閽€佺‘璁ゆ寜閽瓑锛夛紝鍏抽棴鏃堕渶灏嗙劍鐐瑰綊杩樺埌瑙﹀彂鍏冪礌
8. **閿洏瀵艰埅**锛氭墍鏈変氦浜掑厓绱犲繀椤绘敮鎸侀敭鐩樻搷浣滐紙Tab 瀵艰埅銆丒nter/Space 婵€娲汇€丒scape 鍏抽棴绛夛級锛孒eroUI 缁勪欢榛樿鏀寔鏃犻渶棰濆澶勭悊
9. **棰滆壊瀵规瘮搴?*锛氭枃鏈笌鑳屾櫙棰滆壊瀵规瘮搴﹂渶绗﹀悎 WCAG 2.1 AA 鏍囧噯锛堝父瑙勬枃鏈?鈮?4.5:1锛屽ぇ鏂囨湰 鈮?3:1锛夛紝浣跨敤 HeroUI 榛樿棰滆壊绯荤粺鍙繚璇佸熀鏈姣斿害
10. **瑙嗚鐘舵€佸弽棣?*锛氭墍鏈夊彲浜や簰鍏冪礌闇€鎻愪緵瑙嗚鎻愮ず锛坔over銆乫ocus銆乤ctive銆乨isabled 鐘舵€侊級锛孒eroUI 缁勪欢榛樿鍖呭惈杩欎簺鐘舵€佹牱寮?11. **鍥剧墖鏇夸唬鏂囨湰**锛氭墍鏈?`<img>` 鍏冪礌蹇呴』鏈?`alt` 灞炴€э紝瑁呴グ鎬у浘鐗囦娇鐢?`alt=""`锛堢┖ alt锛夛紝淇℃伅鎬у浘鐗囬渶鎻愪緵鏈夋剰涔夌殑鎻忚堪鏂囨湰
<!-- ACCESSIBILITY-RULES-END -->

<!-- TAILWIND-ARBITRARY-VALUES-RULES-START -->
## Tailwind 浠绘剰鍊艰鍒?(Tailwind Arbitrary Value Rules)

涓ョ鍦ㄥ瓨鍦ㄦ爣鍑?Tailwind 宸ュ叿绫荤殑鍓嶆彁涓嬩娇鐢ㄤ换鎰忓€硷紙Arbitrary Value锛夛紝鍏蜂綋瑙勫垯濡備笅锛?
1. **浼樺厛浣跨敤鏍囧噯宸ュ叿绫?*锛氬浜?Tailwind 鐨?spacing/灏哄浣撶郴锛堟闀?0.25rem锛夛紝濡傛灉鏍囧噯宸ュ叿绫伙紙濡?`w-60` = 15rem = 240px锛夎兘瀹炵幇涓庝换鎰忓€硷紙濡?`w-[240px]`锛夊畬鍏ㄧ浉鍚岀殑鏁堟灉锛屽垯蹇呴』浣跨敤鏍囧噯宸ュ叿绫伙紝涓嶅緱鑷畾涔変换鎰忓€?2. **杞崲瑙勫垯**锛氫娇鐢ㄤ互涓嬪師鍒欏垽鏂槸鍚﹀瓨鍦ㄧ瓑鏁堟爣鍑嗙被锛?   - 闂磋窛/瀹介珮/鍐呰竟璺?澶栬竟璺濓細濡傛灉鏈夊唴缃殑 `{property}-{n}` 绫昏兘绮剧‘鍖归厤鐩爣鍊硷紙n 涓?0.25rem 鐨勫€嶆暟锛夛紝鍒欑洿鎺ヤ娇鐢ㄥ唴缃被
   - 棰滆壊锛氬鏋滄湁鍐呯疆棰滆壊鍚嶇О锛屼紭鍏堜娇鐢?`text-red-500` 鑰岄潪 `text-[#ef4444]`
   - 瀛椾綋澶у皬/琛岄珮锛氬鏋?Tailwind 鍐呯疆鐨勫瓧浣撳ぇ灏忛厤缃紙濡?`text-sm`銆乣text-lg`锛夎兘鍖归厤璁捐闇€姹傦紝灏变紭鍏堜娇鐢?3. **渚嬪鍦烘櫙**锛氫粎褰撲互涓嬫儏鍐垫墠鍏佽浣跨敤浠绘剰鍊硷細
   - Tailwind 鏍囧噯宸ュ叿绫讳腑涓嶅瓨鍦ㄨ兘瀹炵幇鐩爣鏁堟灉鐨勭瓑鏁堢被锛堝绮剧‘鐨?17px 闂磋窛銆佽嚜瀹氫箟娓愬彉鑹层€侀潪鏍囧噯鏂偣灏哄绛夛級
   - 蹇呴』鍦ㄤ唬鐮佹敞閲婁腑娉ㄦ槑浣跨敤浠绘剰鍊肩殑鐞嗙敱
4. **妫€鏌ユ柟寮?*锛氬湪缂栫爜鏃讹紝閬囧埌 `[` 浠绘剰鍊艰娉曟椂锛屽厛鏌ラ槄 Tailwind 鏂囨。纭鏄惁瀛樺湪绛夋晥鏍囧噯绫伙紝纭涓嶅瓨鍦ㄦ椂鎵嶄娇鐢ㄤ换鎰忓€?
**绀轰緥**锛?- 鉁?`w-60`锛堟纭紝w-60 = 240px锛?- 鉂?`w-[240px]`锛堥敊璇紝搴斾娇鐢?w-60锛?- 鉁?`p-[17px]`锛堝厑璁革紝鏍囧噯绫绘棤绛夋晥 17px 闂磋窛锛?- 鉁?`text-[#123abc]`锛堜粎鍦ㄦ爣鍑嗚皟鑹茬洏娌℃湁璇ョ簿纭壊鍊兼椂鍏佽锛?<!-- TAILWIND-ARBITRARY-VALUES-RULES-END -->

<!-- TESTING-RULES-START -->
## 娴嬭瘯瑙勫垯 (Testing Rules)

浣跨敤 Vitest + React Testing Library 缂栧啓娴嬭瘯锛岀‘淇濅唬鐮佽川閲忓拰鍙淮鎶ゆ€э紝鍏蜂綋瑙勫垯濡備笅锛?
1. **娴嬭瘯妗嗘灦**锛氫娇鐢?Vitest锛堜笌 Vite 鐢熸€佷竴鑷达級浣滀负娴嬭瘯杩愯鍣紝閰嶅悎 `@testing-library/react` 杩涜缁勪欢娴嬭瘯锛岄厤鍚?`@testing-library/user-event` 妯℃嫙鐢ㄦ埛浜や簰
2. **娴嬭瘯鏂囦欢浣嶇疆**锛氭祴璇曟枃浠朵笌婧愮爜鏂囦欢鐩搁偦鏀剧疆锛屽懡鍚嶄负 `*.test.ts` 鎴?`*.test.tsx`
   ```
   src/
   鈹溾攢鈹€ utils/
   鈹?  鈹溾攢鈹€ formatDate.ts
   鈹?  鈹斺攢鈹€ formatDate.test.ts
   鈹溾攢鈹€ api/
   鈹?  鈹斺攢鈹€ user/
   鈹?      鈹溾攢鈹€ index.ts
   鈹?      鈹斺攢鈹€ index.test.ts
   鈹斺攢鈹€ components/
       鈹斺攢鈹€ UserCard/
           鈹溾攢鈹€ UserCard.tsx
           鈹斺攢鈹€ UserCard.test.tsx
   ```
3. **娴嬭瘯鑼冨洿**锛?   - 宸ュ叿鍑芥暟锛氬繀椤昏鐩栨牳蹇冮€昏緫鐨勫崟鍏冩祴璇曪紙姝ｅ父杈撳叆銆佽竟鐣屽€笺€佸紓甯歌緭鍏ワ級
   - API 灞傦細Mock axios 璇锋眰锛岄獙璇佽姹傚弬鏁板拰鍝嶅簲澶勭悊
   - 缁勪欢锛氳鐩栨覆鏌撱€佺敤鎴蜂氦浜掋€佺姸鎬佸彉鍖栵紝閬垮厤娴嬭瘯瀹炵幇缁嗚妭
   - Hook锛氶€氳繃 `renderHook` 娴嬭瘯鑷畾涔?Hook 鐨勯€昏緫
4. **娴嬭瘯鍐呭瑕佹眰**锛?   - 宸ュ叿鍑芥暟娴嬭瘯锛氶獙璇佽緭鍏ヨ緭鍑猴紝鍖呭惈姝ｅ父璺緞鍜岄敊璇矾寰?   - 缁勪欢娴嬭瘯锛氶獙璇佹覆鏌撶粨鏋溿€佺敤鎴蜂氦浜掑悗鐨勭姸鎬佸彉鍖栥€佸紓姝ユ暟鎹姞杞藉畬鎴愬悗鐨?UI
   - 閬垮厤娴嬭瘯鍐呴儴瀹炵幇缁嗚妭锛堝 state 鍊兼垨绉佹湁鏂规硶锛夛紝鍙祴澶栭儴琛屼负
5. **Mock 绛栫暐**锛氬閮ㄤ緷璧栵紙API 璇锋眰銆佹祻瑙堝櫒 API锛変娇鐢?`vi.mock` 鎴?MSW 妯℃嫙锛屼繚鎸佹祴璇曠殑纭畾鎬у拰鐙珛鎬?6. **瑕嗙洊鐜?*锛氭牳蹇冩ā鍧楋紙宸ュ叿鍑芥暟銆丄PI 灞傦級鐨勮瑕嗙洊鐜囦笉浣庝簬 80%
<!-- TESTING-RULES-END -->

<!-- GIT-RULES-START -->
## Git 鎻愪氦瑙勮寖 (Git Commit Conventions)

缁熶竴 Git 鎻愪氦娑堟伅銆佸垎鏀懡鍚嶅拰鍗忎綔娴佺▼锛岀‘淇濇彁浜ゅ巻鍙叉竻鏅板彲杩芥函锛屽叿浣撹鍒欏涓嬶細

1. **鎻愪氦娑堟伅鏍煎紡**锛氫娇鐢?Conventional Commits 瑙勮寖锛屾牸寮忎负 `<type>(<scope>): <description>`
   - `feat`锛氭柊鍔熻兘锛堢ず渚嬶細`feat(user): add user profile page`锛?   - `fix`锛欱ug 淇锛堢ず渚嬶細`fix(api): handle 401 token expiry`锛?   - `refactor`锛氶噸鏋勶紙绀轰緥锛歚refactor(auth): extract useAuth hook`锛?   - `chore`锛氬伐绋嬮厤缃彉鏇达紙绀轰緥锛歚chore(deps): upgrade heroui to v3.2`锛?   - `docs`锛氭枃妗ｅ彉鏇达紙绀轰緥锛歚docs: update api request rules`锛?   - `style`锛氭牱寮忓彉鏇达紙绀轰緥锛歚style(sidebar): adjust spacing`锛?   - `test`锛氭祴璇曠浉鍏筹紙绀轰緥锛歚test(utils): add formatDate unit tests`锛?2. **鍒嗘敮鍛藉悕**锛氫笌鎻愪氦绫诲瀷瀵瑰簲锛屾牸寮忎负 `<type>/<short-description>`
   - `feat/user-profile`銆乣fix/token-refresh`銆乣refactor/auth-hook`銆乣chore/upgrade-heroui`
3. **鍘熷瓙鍖栨彁浜?*锛氫竴涓?commit 鍙仛涓€浠朵簨銆備笉鍚屽姛鑳姐€佷笉鍚屾ā鍧楃殑鍙樻洿搴斿垎澶氭鎻愪氦锛屼笉娣峰叆鍚屼竴涓?commit
4. **Rebase 绛栫暐**锛氬姛鑳藉垎鏀湪鍚堝叆涓诲垎鏀墠鎵ц `git rebase main`锛屼繚鎸佺嚎鎬у巻鍙诧紝閬垮厤浜х敓鍚堝苟鑺傜偣
5. **涓嶆彁浜や骇鐗?*锛氭瀯寤轰骇鐗╋紙`dist/`銆乣build/`锛夈€佺紪杈戝櫒閰嶇疆锛坄.vscode/` 绛夛級銆佹搷浣滅郴缁熸枃浠讹紙`Thumbs.db`銆乣.DS_Store`锛夊繀椤诲啓鍦?`.gitignore` 涓紝绂佹寮哄埗鎻愪氦
6. **鎻愪氦鍓嶆鏌?*锛氭彁浜ゅ墠纭繚浠ｇ爜閫氳繃 ESLint 妫€鏌ワ紙鎵€鏈変慨鏀规枃浠舵棤 lint 閿欒锛夊拰绫诲瀷妫€鏌ワ紙`tsc --noEmit`锛?<!-- GIT-RULES-END -->

<!-- HEROUI-REACT-AGENTS-MD-START -->
llms-full.txt: https://heroui.com/react/llms-full.txt||
[HeroUI React v3 Docs Index]|root: ./.heroui-docs/react|STOP. What you remember about HeroUI React v3 is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: heroui agents-md --react --output AGENTS.md|.:{components\(buttons)\button-group.mdx,components\(buttons)\button.mdx,components\(buttons)\close-button.mdx,components\(buttons)\toggle-button-group.mdx,components\(buttons)\toggle-button.mdx,components\(collections)\dropdown.mdx,components\(collections)\list-box.mdx,components\(collections)\tag-group.mdx,components\(colors)\color-area.mdx,components\(colors)\color-field.mdx,components\(colors)\color-picker.mdx,components\(colors)\color-slider.mdx,components\(colors)\color-swatch-picker.mdx,components\(colors)\color-swatch.mdx,components\(controls)\slider.mdx,components\(controls)\switch.mdx,components\(data-display)\badge.mdx,components\(data-display)\chip.mdx,components\(data-display)\table.mdx,components\(date-and-time)\calendar.mdx,components\(date-and-time)\date-field.mdx,components\(date-and-time)\date-picker.mdx,components\(date-and-time)\date-range-picker.mdx,components\(date-and-time)\range-calendar.mdx,components\(date-and-time)\time-field.mdx,components\(feedback)\alert.mdx,components\(feedback)\meter.mdx,components\(feedback)\progress-bar.mdx,components\(feedback)\progress-circle.mdx,components\(feedback)\skeleton.mdx,components\(feedback)\spinner.mdx,components\(forms)\checkbox-group.mdx,components\(forms)\checkbox.mdx,components\(forms)\description.mdx,components\(forms)\error-message.mdx,components\(forms)\field-error.mdx,components\(forms)\fieldset.mdx,components\(forms)\form.mdx,components\(forms)\input-group.mdx,components\(forms)\input-otp.mdx,components\(forms)\input.mdx,components\(forms)\label.mdx,components\(forms)\number-field.mdx,components\(forms)\radio-group.mdx,components\(forms)\search-field.mdx,components\(forms)\text-area.mdx,components\(forms)\text-field.mdx,components\(layout)\card.mdx,components\(layout)\separator.mdx,components\(layout)\surface.mdx,components\(layout)\toolbar.mdx,components\(media)\avatar.mdx,components\(navigation)\accordion.mdx,components\(navigation)\breadcrumbs.mdx,components\(navigation)\disclosure-group.mdx,components\(navigation)\disclosure.mdx,components\(navigation)\link.mdx,components\(navigation)\pagination.mdx,components\(navigation)\tabs.mdx,components\(overlays)\alert-dialog.mdx,components\(overlays)\drawer.mdx,components\(overlays)\modal.mdx,components\(overlays)\popover.mdx,components\(overlays)\toast.mdx,components\(overlays)\tooltip.mdx,components\(pickers)\autocomplete.mdx,components\(pickers)\combo-box.mdx,components\(pickers)\select.mdx,components\(typography)\kbd.mdx,components\(typography)\typography.mdx,components\(utilities)\scroll-shadow.mdx,components\index.mdx,getting-started\(handbook)\animation.mdx,getting-started\(handbook)\colors.mdx,getting-started\(handbook)\composition.mdx,getting-started\(handbook)\dark-mode.mdx,getting-started\(handbook)\styling.mdx,getting-started\(handbook)\theming.mdx,getting-started\(overview)\cli.mdx,getting-started\(overview)\design-principles.mdx,getting-started\(overview)\frameworks.mdx,getting-started\(overview)\quick-start.mdx,getting-started\(ui-for-agents)\agent-skills.mdx,getting-started\(ui-for-agents)\agents-md.mdx,getting-started\(ui-for-agents)\llms-txt.mdx,getting-started\(ui-for-agents)\mcp-server.mdx,getting-started\index.mdx,releases\index.mdx,releases\v3-0-0-alpha-32.mdx,releases\v3-0-0-alpha-33.mdx,releases\v3-0-0-alpha-34.mdx,releases\v3-0-0-alpha-35.mdx,releases\v3-0-0-beta-1.mdx,releases\v3-0-0-beta-2.mdx,releases\v3-0-0-beta-3.mdx,releases\v3-0-0-beta-4.mdx,releases\v3-0-0-beta-6.mdx,releases\v3-0-0-beta-7.mdx,releases\v3-0-0-beta-8.mdx,releases\v3-0-0-rc-1.mdx,releases\v3-0-0.mdx,releases\v3-0-2.mdx,releases\v3-0-3.mdx,releases\v3-0-4.mdx,releases\v3-0-5.mdx,releases\v3-1-0.mdx,releases\v3-2-0.mdx,releases\v3-2-1.mdx,releases\v3-2-2.mdx}|demos/.:{cn\accordion\basic.tsx,cn\accordion\controlled.tsx,cn\accordion\custom-indicator.tsx,cn\accordion\custom-render-function.tsx,cn\accordion\custom-styles.tsx,cn\accordion\disabled.tsx,cn\accordion\faq.tsx,cn\accordion\multiple.tsx,cn\accordion\surface.tsx,cn\accordion\without-separator.tsx,cn\alert-dialog\backdrop-variants.tsx,cn\alert-dialog\close-methods.tsx,cn\alert-dialog\controlled.tsx,cn\alert-dialog\custom-animations.tsx,cn\alert-dialog\custom-backdrop.tsx,cn\alert-dialog\custom-icon.tsx,cn\alert-dialog\custom-portal.tsx,cn\alert-dialog\custom-trigger.tsx,cn\alert-dialog\default.tsx,cn\alert-dialog\dismiss-behavior.tsx,cn\alert-dialog\placements.tsx,cn\alert-dialog\sizes.tsx,cn\alert-dialog\statuses.tsx,cn\alert-dialog\with-close-button.tsx,cn\alert\basic.tsx,cn\autocomplete\allows-empty-collection.tsx,cn\autocomplete\asynchronous-filtering.tsx,cn\autocomplete\controlled-open-state.tsx,cn\autocomplete\controlled.tsx,cn\autocomplete\custom-indicator.tsx,cn\autocomplete\default.tsx,cn\autocomplete\disabled.tsx,cn\autocomplete\email-recipients.tsx,cn\autocomplete\full-width.tsx,cn\autocomplete\location-search.tsx,cn\autocomplete\multiple-select.tsx,cn\autocomplete\required.tsx,cn\autocomplete\single-select.tsx,cn\autocomplete\tag-group-selection.tsx,cn\autocomplete\user-selection-multiple.tsx,cn\autocomplete\user-selection.tsx,cn\autocomplete\variants.tsx,cn\autocomplete\virtualization.tsx,cn\autocomplete\with-description.tsx,cn\autocomplete\with-disabled-options.tsx,cn\autocomplete\with-sections.tsx,cn\avatar\basic.tsx,cn\avatar\colors.tsx,cn\avatar\custom-styles.tsx,cn\avatar\fallback.tsx,cn\avatar\group.tsx,cn\avatar\sizes.tsx,cn\avatar\variants.tsx,cn\badge\basic.tsx,cn\badge\colors.tsx,cn\badge\dot.tsx,cn\badge\placements.tsx,cn\badge\sizes.tsx,cn\badge\variants.tsx,cn\badge\with-content.tsx,cn\breadcrumbs\basic.tsx,cn\breadcrumbs\custom-render-function.tsx,cn\breadcrumbs\custom-separator.tsx,cn\breadcrumbs\disabled.tsx,cn\breadcrumbs\level-2.tsx,cn\breadcrumbs\level-3.tsx,cn\button-group\basic.tsx,cn\button-group\disabled.tsx,cn\button-group\full-width.tsx,cn\button-group\orientation.tsx,cn\button-group\sizes.tsx,cn\button-group\variants.tsx,cn\button-group\with-icons.tsx,cn\button-group\without-separator.tsx,cn\button\basic.tsx,cn\button\custom-render-function.tsx,cn\button\custom-variants.tsx,cn\button\disabled.tsx,cn\button\full-width.tsx,cn\button\icon-only.tsx,cn\button\loading-state.tsx,cn\button\loading.tsx,cn\button\outline-variant.tsx,cn\button\ripple-effect.tsx,cn\button\sizes.tsx,cn\button\social.tsx,cn\button\variants.tsx,cn\button\with-icons.tsx,cn\calendar\basic.tsx,cn\calendar\booking-calendar.tsx,cn\calendar\controlled.tsx,cn\calendar\custom-icons.tsx,cn\calendar\custom-styles.tsx,cn\calendar\day-view.tsx,cn\calendar\default-value.tsx,cn\calendar\disabled.tsx,cn\calendar\focused-value.tsx,cn\calendar\international-calendar.tsx,cn\calendar\min-max-dates.tsx,cn\calendar\multiple-months.tsx,cn\calendar\multiple-selection.tsx,cn\calendar\read-only.tsx,cn\calendar\unavailable-dates.tsx,cn\calendar\week-view.tsx,cn\calendar\weeks-in-month.tsx,cn\calendar\with-indicators.tsx,cn\calendar\year-picker.tsx,cn\card\default.tsx,cn\card\horizontal.tsx,cn\card\variants.tsx,cn\card\with-avatar.tsx,cn\card\with-form.tsx,cn\card\with-images.tsx,cn\checkbox-group\basic.tsx,cn\checkbox-group\controlled.tsx,cn\checkbox-group\custom-render-function.tsx,cn\checkbox-group\disabled.tsx,cn\checkbox-group\features-and-addons.tsx,cn\checkbox-group\indeterminate.tsx,cn\checkbox-group\on-surface.tsx,cn\checkbox-group\validation.tsx,cn\checkbox-group\with-custom-indicator.tsx,cn\checkbox\basic.tsx,cn\checkbox\controlled.tsx,cn\checkbox\custom-indicator.tsx,cn\checkbox\custom-render-function.tsx,cn\checkbox\custom-styles.tsx,cn\checkbox\default-selected.tsx,cn\checkbox\disabled.tsx,cn\checkbox\external-label.tsx,cn\checkbox\form.tsx,cn\checkbox\full-rounded.tsx,cn\checkbox\indeterminate.tsx,cn\checkbox\invalid.tsx,cn\checkbox\render-props.tsx,cn\checkbox\variants.tsx,cn\checkbox\with-description.tsx,cn\chip\basic.tsx,cn\chip\statuses.tsx,cn\chip\variants.tsx,cn\chip\vibrant-palette.tsx,cn\chip\with-icon.tsx,cn\close-button\default.tsx,cn\close-button\interactive.tsx,cn\close-button\variants.tsx,cn\close-button\with-custom-icon.tsx,cn\color-area\basic.tsx,cn\color-area\controlled.tsx,cn\color-area\custom-render-function.tsx,cn\color-area\disabled.tsx,cn\color-area\space-and-channels.tsx,cn\color-area\with-dots.tsx,cn\color-field\basic.tsx,cn\color-field\channel-editing.tsx,cn\color-field\controlled.tsx,cn\color-field\custom-render-function.tsx,cn\color-field\disabled.tsx,cn\color-field\form-example.tsx,cn\color-field\full-width.tsx,cn\color-field\invalid.tsx,cn\color-field\on-surface.tsx,cn\color-field\required.tsx,cn\color-field\variants.tsx,cn\color-field\with-description.tsx,cn\color-picker\basic.tsx,cn\color-picker\controlled.tsx,cn\color-picker\with-fields.tsx,cn\color-picker\with-sliders.tsx,cn\color-picker\with-swatches.tsx,cn\color-slider\alpha-channel.tsx,cn\color-slider\basic.tsx,cn\color-slider\channels.tsx,cn\color-slider\controlled.tsx,cn\color-slider\custom-render-function.tsx,cn\color-slider\disabled.tsx,cn\color-slider\rgb-channels.tsx,cn\color-slider\vertical.tsx,cn\color-swatch-picker\basic.tsx,cn\color-swatch-picker\controlled.tsx,cn\color-swatch-picker\custom-indicator.tsx,cn\color-swatch-picker\custom-render-function.tsx,cn\color-swatch-picker\default-value.tsx,cn\color-swatch-picker\disabled.tsx,cn\color-swatch-picker\sizes.tsx,cn\color-swatch-picker\stack-layout.tsx,cn\color-swatch-picker\variants.tsx,cn\color-swatch\accessibility.tsx,cn\color-swatch\basic.tsx,cn\color-swatch\custom-render-function.tsx,cn\color-swatch\custom-styles.tsx,cn\color-swatch\shapes.tsx,cn\color-swatch\sizes.tsx,cn\color-swatch\transparency.tsx,cn\combo-box\allows-custom-value.tsx,cn\combo-box\asynchronous-loading.tsx,cn\combo-box\controlled-input-value.tsx,cn\combo-box\controlled.tsx,cn\combo-box\custom-filtering.tsx,cn\combo-box\custom-indicator.tsx,cn\combo-box\custom-render-function.tsx,cn\combo-box\custom-value.tsx,cn\combo-box\default-selected-key.tsx,cn\combo-box\default.tsx,cn\combo-box\disabled.tsx,cn\combo-box\full-width.tsx,cn\combo-box\menu-trigger.tsx,cn\combo-box\on-surface.tsx,cn\combo-box\required.tsx,cn\combo-box\with-description.tsx,cn\combo-box\with-disabled-options.tsx,cn\combo-box\with-sections.tsx,cn\date-field\basic.tsx,cn\date-field\controlled.tsx,cn\date-field\custom-render-function.tsx,cn\date-field\disabled.tsx,cn\date-field\form-example.tsx,cn\date-field\full-width.tsx,cn\date-field\granularity.tsx,cn\date-field\invalid.tsx,cn\date-field\on-surface.tsx,cn\date-field\required.tsx,cn\date-field\variants.tsx,cn\date-field\with-description.tsx,cn\date-field\with-prefix-and-suffix.tsx,cn\date-field\with-prefix-icon.tsx,cn\date-field\with-suffix-icon.tsx,cn\date-field\with-validation.tsx,cn\date-picker\basic.tsx,cn\date-picker\controlled.tsx,cn\date-picker\custom-render-function.tsx,cn\date-picker\disabled.tsx,cn\date-picker\form-example.tsx,cn\date-picker\format-options-no-ssr.tsx,cn\date-picker\format-options.tsx,cn\date-picker\international-calendar.tsx,cn\date-picker\with-custom-indicator.tsx,cn\date-picker\with-validation.tsx,cn\date-range-picker\basic.tsx,cn\date-range-picker\controlled.tsx,cn\date-range-picker\custom-render-function.tsx,cn\date-range-picker\disabled.tsx,cn\date-range-picker\form-example.tsx,cn\date-range-picker\format-options-no-ssr.tsx,cn\date-range-picker\format-options.tsx,cn\date-range-picker\input-container.tsx,cn\date-range-picker\international-calendar.tsx,cn\date-range-picker\with-custom-indicator.tsx,cn\date-range-picker\with-validation.tsx,cn\description\basic.tsx,cn\disclosure-group\basic.tsx,cn\disclosure-group\controlled.tsx,cn\disclosure\basic.tsx,cn\disclosure\custom-render-function.tsx,cn\drawer\backdrop-variants.tsx,cn\drawer\basic.tsx,cn\drawer\controlled.tsx,cn\drawer\navigation.tsx,cn\drawer\non-dismissable.tsx,cn\drawer\placements.tsx,cn\drawer\scrollable-content.tsx,cn\drawer\with-form.tsx,cn\dropdown\controlled-open-state.tsx,cn\dropdown\controlled.tsx,cn\dropdown\custom-trigger.tsx,cn\dropdown\default.tsx,cn\dropdown\long-press-trigger.tsx,cn\dropdown\single-with-custom-indicator.tsx,cn\dropdown\with-custom-submenu-indicator.tsx,cn\dropdown\with-descriptions.tsx,cn\dropdown\with-disabled-items.tsx,cn\dropdown\with-icons.tsx,cn\dropdown\with-keyboard-shortcuts.tsx,cn\dropdown\with-multiple-selection.tsx,cn\dropdown\with-section-level-selection.tsx,cn\dropdown\with-sections.tsx,cn\dropdown\with-single-selection.tsx,cn\dropdown\with-submenus.tsx,cn\error-message\basic.tsx,cn\error-message\with-tag-group.tsx,cn\field-error\basic.tsx,cn\fieldset\basic.tsx,cn\fieldset\on-surface.tsx,cn\form\basic.tsx,cn\form\custom-render-function.tsx,cn\input-group\default.tsx,cn\input-group\disabled.tsx,cn\input-group\full-width.tsx,cn\input-group\invalid.tsx,cn\input-group\on-surface.tsx,cn\input-group\password-with-toggle.tsx,cn\input-group\required.tsx,cn\input-group\variants.tsx,cn\input-group\with-badge-suffix.tsx,cn\input-group\with-copy-suffix.tsx,cn\input-group\with-icon-prefix-and-copy-suffix.tsx,cn\input-group\with-icon-prefix-and-text-suffix.tsx,cn\input-group\with-keyboard-shortcut.tsx,cn\input-group\with-loading-suffix.tsx,cn\input-group\with-prefix-and-suffix.tsx,cn\input-group\with-prefix-icon.tsx,cn\input-group\with-suffix-icon.tsx,cn\input-group\with-text-prefix.tsx,cn\input-group\with-text-suffix.tsx,cn\input-group\with-textarea.tsx,cn\input-otp\basic.tsx,cn\input-otp\controlled.tsx,cn\input-otp\disabled.tsx,cn\input-otp\form-example.tsx,cn\input-otp\four-digits.tsx,cn\input-otp\on-complete.tsx,cn\input-otp\on-surface.tsx,cn\input-otp\variants.tsx,cn\input-otp\with-pattern.tsx,cn\input-otp\with-validation.tsx,cn\input\basic.tsx,cn\input\controlled.tsx,cn\input\full-width.tsx,cn\input\on-surface.tsx,cn\input\types.tsx,cn\input\variants.tsx,cn\kbd\basic.tsx,cn\kbd\inline.tsx,cn\kbd\instructional.tsx,cn\kbd\navigation.tsx,cn\kbd\special.tsx,cn\kbd\variants.tsx,cn\label\basic.tsx,cn\link\basic.tsx,cn\link\custom-icon.tsx,cn\link\custom-render-function.tsx,cn\link\icon-placement.tsx,cn\link\underline-and-offset.tsx,cn\link\underline-offset.tsx,cn\link\underline-variants.tsx,cn\list-box\controlled.tsx,cn\list-box\custom-check-icon.tsx,cn\list-box\custom-render-function.tsx,cn\list-box\default.tsx,cn\list-box\multi-select.tsx,cn\list-box\scrollbar-modes.tsx,cn\list-box\virtualization.tsx,cn\list-box\with-disabled-items.tsx,cn\list-box\with-sections.tsx,cn\meter\basic.tsx,cn\meter\colors.tsx,cn\meter\custom-value.tsx,cn\meter\sizes.tsx,cn\meter\without-label.tsx,cn\modal\backdrop-variants.tsx,cn\modal\close-methods.tsx,cn\modal\controlled.tsx,cn\modal\custom-animations.tsx,cn\modal\custom-backdrop.tsx,cn\modal\custom-portal.tsx,cn\modal\custom-trigger.tsx,cn\modal\default.tsx,cn\modal\dismiss-behavior.tsx,cn\modal\placements.tsx,cn\modal\scroll-comparison.tsx,cn\modal\sizes.tsx,cn\modal\with-form.tsx,cn\number-field\basic.tsx,cn\number-field\controlled.tsx,cn\number-field\custom-icons.tsx,cn\number-field\custom-render-function.tsx,cn\number-field\disabled.tsx,cn\number-field\form-example.tsx,cn\number-field\full-width.tsx,cn\number-field\on-surface.tsx,cn\number-field\required.tsx,cn\number-field\validation.tsx,cn\number-field\variants.tsx,cn\number-field\with-chevrons.tsx,cn\number-field\with-description.tsx,cn\number-field\with-format-options.tsx,cn\number-field\with-step.tsx,cn\number-field\with-validation.tsx,cn\pagination\basic.tsx,cn\pagination\controlled.tsx,cn\pagination\custom-icons.tsx,cn\pagination\disabled.tsx,cn\pagination\simple-prev-next.tsx,cn\pagination\sizes.tsx,cn\pagination\with-ellipsis.tsx,cn\pagination\with-summary.tsx,cn\popover\basic.tsx,cn\popover\custom-render-function.tsx,cn\popover\interactive.tsx,cn\popover\placement.tsx,cn\popover\with-arrow.tsx,cn\progress-bar\basic.tsx,cn\progress-bar\colors.tsx,cn\progress-bar\custom-value.tsx,cn\progress-bar\indeterminate.tsx,cn\progress-bar\sizes.tsx,cn\progress-bar\without-label.tsx,cn\progress-circle\basic.tsx,cn\progress-circle\colors.tsx,cn\progress-circle\custom-svg.tsx,cn\progress-circle\indeterminate.tsx,cn\progress-circle\sizes.tsx,cn\progress-circle\with-label.tsx,cn\radio-group\basic.tsx,cn\radio-group\controlled.tsx,cn\radio-group\custom-indicator.tsx,cn\radio-group\custom-render-function.tsx,cn\radio-group\delivery-and-payment.tsx,cn\radio-group\disabled.tsx,cn\radio-group\horizontal.tsx,cn\radio-group\on-surface.tsx,cn\radio-group\uncontrolled.tsx,cn\radio-group\validation.tsx,cn\radio-group\variants.tsx,cn\range-calendar\allows-non-contiguous-ranges.tsx,cn\range-calendar\anchor-unavailable-dates.tsx,cn\range-calendar\basic.tsx,cn\range-calendar\booking-calendar.tsx,cn\range-calendar\controlled.tsx,cn\range-calendar\day-view.tsx,cn\range-calendar\default-value.tsx,cn\range-calendar\disabled.tsx,cn\range-calendar\focused-value.tsx,cn\range-calendar\international-calendar.tsx,cn\range-calendar\invalid.tsx,cn\range-calendar\min-max-dates.tsx,cn\range-calendar\multiple-months.tsx,cn\range-calendar\read-only.tsx,cn\range-calendar\three-months.tsx,cn\range-calendar\unavailable-dates.tsx,cn\range-calendar\week-view.tsx,cn\range-calendar\weeks-in-month.tsx,cn\range-calendar\with-indicators.tsx,cn\range-calendar\year-picker.tsx,cn\scroll-shadow\custom-size.tsx,cn\scroll-shadow\default.tsx,cn\scroll-shadow\hide-scroll-bar.tsx,cn\scroll-shadow\orientation.tsx,cn\scroll-shadow\visibility-change.tsx,cn\scroll-shadow\with-card.tsx,cn\search-field\basic.tsx,cn\search-field\controlled.tsx,cn\search-field\custom-icons.tsx,cn\search-field\custom-render-function.tsx,cn\search-field\disabled.tsx,cn\search-field\form-example.tsx,cn\search-field\full-width.tsx,cn\search-field\on-surface.tsx,cn\search-field\required.tsx,cn\search-field\validation.tsx,cn\search-field\variants.tsx,cn\search-field\with-description.tsx,cn\search-field\with-keyboard-shortcut.tsx,cn\search-field\with-validation.tsx,cn\select\asynchronous-loading.tsx,cn\select\controlled-multiple.tsx,cn\select\controlled-open-state.tsx,cn\select\controlled.tsx,cn\select\custom-indicator.tsx,cn\select\custom-render-function.tsx,cn\select\custom-value-multiple.tsx,cn\select\custom-value.tsx,cn\select\default.tsx,cn\select\disabled.tsx,cn\select\full-width.tsx,cn\select\multiple-select.tsx,cn\select\on-surface.tsx,cn\select\required.tsx,cn\select\variants.tsx,cn\select\with-description.tsx,cn\select\with-disabled-options.tsx,cn\select\with-sections.tsx,cn\separator\basic.tsx,cn\separator\custom-render-function.tsx,cn\separator\manual-variant-override.tsx,cn\separator\variants.tsx,cn\separator\vertical.tsx,cn\separator\with-content.tsx,cn\separator\with-surface.tsx,cn\skeleton\animation-types.tsx,cn\skeleton\basic.tsx,cn\skeleton\card.tsx,cn\skeleton\grid.tsx,cn\skeleton\list.tsx,cn\skeleton\single-shimmer.tsx,cn\skeleton\text-content.tsx,cn\skeleton\user-profile.tsx,cn\slider\custom-render-function.tsx,cn\slider\default.tsx,cn\slider\disabled.tsx,cn\slider\range.tsx,cn\slider\vertical.tsx,cn\spinner\basic.tsx,cn\spinner\colors.tsx,cn\spinner\sizes.tsx,cn\surface\variants.tsx,cn\switch\basic.tsx,cn\switch\controlled.tsx,cn\switch\custom-render-function.tsx,cn\switch\custom-styles.tsx,cn\switch\default-selected.tsx,cn\switch\disabled.tsx,cn\switch\form.tsx,cn\switch\group-horizontal.tsx,cn\switch\group.tsx,cn\switch\label-position.tsx,cn\switch\render-props.tsx,cn\switch\sizes.tsx,cn\switch\with-description.tsx,cn\switch\with-icons.tsx,cn\switch\without-label.tsx,cn\table\async-loading.tsx,cn\table\basic.tsx,cn\table\column-resizing.tsx,cn\table\custom-cells.tsx,cn\table\empty-state.tsx,cn\table\expandable-rows.tsx,cn\table\pagination.tsx,cn\table\secondary-variant.tsx,cn\table\selection.tsx,cn\table\sorting.tsx,cn\table\tanstack-table.tsx,cn\table\virtualization.tsx,cn\tabs\basic.tsx,cn\tabs\custom-render-function.tsx,cn\tabs\custom-styles.tsx,cn\tabs\disabled.tsx,cn\tabs\overflow.tsx,cn\tabs\secondary-vertical.tsx,cn\tabs\secondary.tsx,cn\tabs\vertical.tsx,cn\tabs\with-separator.tsx,cn\tag-group\basic.tsx,cn\tag-group\controlled.tsx,cn\tag-group\custom-render-function.tsx,cn\tag-group\disabled.tsx,cn\tag-group\selection-modes.tsx,cn\tag-group\sizes.tsx,cn\tag-group\variants.tsx,cn\tag-group\with-error-message.tsx,cn\tag-group\with-list-data.tsx,cn\tag-group\with-prefix.tsx,cn\tag-group\with-remove-button.tsx,cn\textarea\basic.tsx,cn\textarea\controlled.tsx,cn\textarea\full-width.tsx,cn\textarea\on-surface.tsx,cn\textarea\rows.tsx,cn\textarea\variants.tsx,cn\textfield\basic.tsx,cn\textfield\controlled.tsx,cn\textfield\custom-render-function.tsx,cn\textfield\disabled.tsx,cn\textfield\full-width.tsx,cn\textfield\input-types.tsx,cn\textfield\on-surface.tsx,cn\textfield\required.tsx,cn\textfield\textarea.tsx,cn\textfield\validation.tsx,cn\textfield\with-description.tsx,cn\textfield\with-error.tsx,cn\time-field\basic.tsx,cn\time-field\controlled.tsx,cn\time-field\custom-render-function.tsx,cn\time-field\disabled.tsx,cn\time-field\form-example.tsx,cn\time-field\full-width.tsx,cn\time-field\invalid.tsx,cn\time-field\on-surface.tsx,cn\time-field\required.tsx,cn\time-field\with-description.tsx,cn\time-field\with-prefix-and-suffix.tsx,cn\time-field\with-prefix-icon.tsx,cn\time-field\with-suffix-icon.tsx,cn\time-field\with-validation.tsx,cn\toast\callbacks.tsx,cn\toast\custom-indicator.tsx,cn\toast\custom-queue.tsx,cn\toast\custom-toast.tsx,cn\toast\default.tsx,cn\toast\placements.tsx,cn\toast\promise.tsx,cn\toast\simple.tsx,cn\toast\variants.tsx,cn\toggle-button-group\attached.tsx,cn\toggle-button-group\basic.tsx,cn\toggle-button-group\controlled.tsx,cn\toggle-button-group\disabled.tsx,cn\toggle-button-group\full-width.tsx,cn\toggle-button-group\orientation.tsx,cn\toggle-button-group\selection-mode.tsx,cn\toggle-button-group\sizes.tsx,cn\toggle-button-group\without-separator.tsx,cn\toggle-button\basic.tsx,cn\toggle-button\controlled.tsx,cn\toggle-button\disabled.tsx,cn\toggle-button\icon-only.tsx,cn\toggle-button\sizes.tsx,cn\toggle-button\variants.tsx,cn\toolbar\basic.tsx,cn\toolbar\custom-styles.tsx,cn\toolbar\vertical.tsx,cn\toolbar\with-button-group.tsx,cn\tooltip\basic.tsx,cn\tooltip\custom-render-function.tsx,cn\tooltip\custom-trigger.tsx,cn\tooltip\placement.tsx,cn\tooltip\with-arrow.tsx,cn\typography\default.tsx,cn\typography\primitives.tsx,cn\typography\prose.tsx,cn\typography\render-props.tsx,cn\typography\typography-scale.tsx,en\accordion\basic.tsx,en\accordion\controlled.tsx,en\accordion\custom-indicator.tsx,en\accordion\custom-render-function.tsx,en\accordion\custom-styles.tsx,en\accordion\disabled.tsx,en\accordion\faq.tsx,en\accordion\multiple.tsx,en\accordion\surface.tsx,en\accordion\without-separator.tsx,en\alert-dialog\backdrop-variants.tsx,en\alert-dialog\close-methods.tsx,en\alert-dialog\controlled.tsx,en\alert-dialog\custom-animations.tsx,en\alert-dialog\custom-backdrop.tsx,en\alert-dialog\custom-icon.tsx,en\alert-dialog\custom-portal.tsx,en\alert-dialog\custom-trigger.tsx,en\alert-dialog\default.tsx,en\alert-dialog\dismiss-behavior.tsx,en\alert-dialog\placements.tsx,en\alert-dialog\sizes.tsx,en\alert-dialog\statuses.tsx,en\alert-dialog\with-close-button.tsx,en\alert\basic.tsx,en\autocomplete\allows-empty-collection.tsx,en\autocomplete\asynchronous-filtering.tsx,en\autocomplete\controlled-open-state.tsx,en\autocomplete\controlled.tsx,en\autocomplete\custom-indicator.tsx,en\autocomplete\default.tsx,en\autocomplete\disabled.tsx,en\autocomplete\email-recipients.tsx,en\autocomplete\full-width.tsx,en\autocomplete\location-search.tsx,en\autocomplete\multiple-select.tsx,en\autocomplete\required.tsx,en\autocomplete\single-select.tsx,en\autocomplete\tag-group-selection.tsx,en\autocomplete\user-selection-multiple.tsx,en\autocomplete\user-selection.tsx,en\autocomplete\variants.tsx,en\autocomplete\virtualization.tsx,en\autocomplete\with-description.tsx,en\autocomplete\with-disabled-options.tsx,en\autocomplete\with-sections.tsx,en\avatar\basic.tsx,en\avatar\colors.tsx,en\avatar\custom-styles.tsx,en\avatar\fallback.tsx,en\avatar\group.tsx,en\avatar\sizes.tsx,en\avatar\variants.tsx,en\badge\basic.tsx,en\badge\colors.tsx,en\badge\dot.tsx,en\badge\placements.tsx,en\badge\sizes.tsx,en\badge\variants.tsx,en\badge\with-content.tsx,en\breadcrumbs\basic.tsx,en\breadcrumbs\custom-render-function.tsx,en\breadcrumbs\custom-separator.tsx,en\breadcrumbs\disabled.tsx,en\breadcrumbs\level-2.tsx,en\breadcrumbs\level-3.tsx,en\button-group\basic.tsx,en\button-group\disabled.tsx,en\button-group\full-width.tsx,en\button-group\orientation.tsx,en\button-group\sizes.tsx,en\button-group\variants.tsx,en\button-group\with-icons.tsx,en\button-group\without-separator.tsx,en\button\basic.tsx,en\button\custom-render-function.tsx,en\button\custom-variants.tsx,en\button\disabled.tsx,en\button\full-width.tsx,en\button\icon-only.tsx,en\button\loading-state.tsx,en\button\loading.tsx,en\button\outline-variant.tsx,en\button\ripple-effect.tsx,en\button\sizes.tsx,en\button\social.tsx,en\button\variants.tsx,en\button\with-icons.tsx,en\calendar\basic.tsx,en\calendar\booking-calendar.tsx,en\calendar\controlled.tsx,en\calendar\custom-icons.tsx,en\calendar\custom-styles.tsx,en\calendar\day-view.tsx,en\calendar\default-value.tsx,en\calendar\disabled.tsx,en\calendar\focused-value.tsx,en\calendar\international-calendar.tsx,en\calendar\min-max-dates.tsx,en\calendar\multiple-months.tsx,en\calendar\multiple-selection.tsx,en\calendar\read-only.tsx,en\calendar\unavailable-dates.tsx,en\calendar\week-view.tsx,en\calendar\weeks-in-month.tsx,en\calendar\with-indicators.tsx,en\calendar\year-picker.tsx,en\card\default.tsx,en\card\horizontal.tsx,en\card\variants.tsx,en\card\with-avatar.tsx,en\card\with-form.tsx,en\card\with-images.tsx,en\checkbox-group\basic.tsx,en\checkbox-group\controlled.tsx,en\checkbox-group\custom-render-function.tsx,en\checkbox-group\disabled.tsx,en\checkbox-group\features-and-addons.tsx,en\checkbox-group\indeterminate.tsx,en\checkbox-group\on-surface.tsx,en\checkbox-group\validation.tsx,en\checkbox-group\with-custom-indicator.tsx,en\checkbox\basic.tsx,en\checkbox\controlled.tsx,en\checkbox\custom-indicator.tsx,en\checkbox\custom-render-function.tsx,en\checkbox\custom-styles.tsx,en\checkbox\default-selected.tsx,en\checkbox\disabled.tsx,en\checkbox\external-label.tsx,en\checkbox\form.tsx,en\checkbox\full-rounded.tsx,en\checkbox\indeterminate.tsx,en\checkbox\invalid.tsx,en\checkbox\render-props.tsx,en\checkbox\variants.tsx,en\checkbox\with-description.tsx,en\chip\basic.tsx,en\chip\statuses.tsx,en\chip\variants.tsx,en\chip\vibrant-palette.tsx,en\chip\with-icon.tsx,en\close-button\default.tsx,en\close-button\interactive.tsx,en\close-button\variants.tsx,en\close-button\with-custom-icon.tsx,en\color-area\basic.tsx,en\color-area\controlled.tsx,en\color-area\custom-render-function.tsx,en\color-area\disabled.tsx,en\color-area\space-and-channels.tsx,en\color-area\with-dots.tsx,en\color-field\basic.tsx,en\color-field\channel-editing.tsx,en\color-field\controlled.tsx,en\color-field\custom-render-function.tsx,en\color-field\disabled.tsx,en\color-field\form-example.tsx,en\color-field\full-width.tsx,en\color-field\invalid.tsx,en\color-field\on-surface.tsx,en\color-field\required.tsx,en\color-field\variants.tsx,en\color-field\with-description.tsx,en\color-picker\basic.tsx,en\color-picker\controlled.tsx,en\color-picker\with-fields.tsx,en\color-picker\with-sliders.tsx,en\color-picker\with-swatches.tsx,en\color-slider\alpha-channel.tsx,en\color-slider\basic.tsx,en\color-slider\channels.tsx,en\color-slider\controlled.tsx,en\color-slider\custom-render-function.tsx,en\color-slider\disabled.tsx,en\color-slider\rgb-channels.tsx,en\color-slider\vertical.tsx,en\color-swatch-picker\basic.tsx,en\color-swatch-picker\controlled.tsx,en\color-swatch-picker\custom-indicator.tsx,en\color-swatch-picker\custom-render-function.tsx,en\color-swatch-picker\default-value.tsx,en\color-swatch-picker\disabled.tsx,en\color-swatch-picker\sizes.tsx,en\color-swatch-picker\stack-layout.tsx,en\color-swatch-picker\variants.tsx,en\color-swatch\accessibility.tsx,en\color-swatch\basic.tsx,en\color-swatch\custom-render-function.tsx,en\color-swatch\custom-styles.tsx,en\color-swatch\shapes.tsx,en\color-swatch\sizes.tsx,en\color-swatch\transparency.tsx,en\combo-box\allows-custom-value.tsx,en\combo-box\asynchronous-loading.tsx,en\combo-box\controlled-input-value.tsx,en\combo-box\controlled.tsx,en\combo-box\custom-filtering.tsx,en\combo-box\custom-indicator.tsx,en\combo-box\custom-render-function.tsx,en\combo-box\custom-value.tsx,en\combo-box\default-selected-key.tsx,en\combo-box\default.tsx,en\combo-box\disabled.tsx,en\combo-box\full-width.tsx,en\combo-box\menu-trigger.tsx,en\combo-box\on-surface.tsx,en\combo-box\required.tsx,en\combo-box\with-description.tsx,en\combo-box\with-disabled-options.tsx,en\combo-box\with-sections.tsx,en\date-field\basic.tsx,en\date-field\controlled.tsx,en\date-field\custom-render-function.tsx,en\date-field\disabled.tsx,en\date-field\form-example.tsx,en\date-field\full-width.tsx,en\date-field\granularity.tsx,en\date-field\invalid.tsx,en\date-field\on-surface.tsx,en\date-field\required.tsx,en\date-field\variants.tsx,en\date-field\with-description.tsx,en\date-field\with-prefix-and-suffix.tsx,en\date-field\with-prefix-icon.tsx,en\date-field\with-suffix-icon.tsx,en\date-field\with-validation.tsx,en\date-picker\basic.tsx,en\date-picker\controlled.tsx,en\date-picker\custom-render-function.tsx,en\date-picker\disabled.tsx,en\date-picker\form-example.tsx,en\date-picker\format-options-no-ssr.tsx,en\date-picker\format-options.tsx,en\date-picker\international-calendar.tsx,en\date-picker\with-custom-indicator.tsx,en\date-picker\with-validation.tsx,en\date-range-picker\basic.tsx,en\date-range-picker\controlled.tsx,en\date-range-picker\custom-render-function.tsx,en\date-range-picker\disabled.tsx,en\date-range-picker\form-example.tsx,en\date-range-picker\format-options-no-ssr.tsx,en\date-range-picker\format-options.tsx,en\date-range-picker\input-container.tsx,en\date-range-picker\international-calendar.tsx,en\date-range-picker\with-custom-indicator.tsx,en\date-range-picker\with-validation.tsx,en\description\basic.tsx,en\disclosure-group\basic.tsx,en\disclosure-group\controlled.tsx,en\disclosure\basic.tsx,en\disclosure\custom-render-function.tsx,en\drawer\backdrop-variants.tsx,en\drawer\basic.tsx,en\drawer\controlled.tsx,en\drawer\navigation.tsx,en\drawer\non-dismissable.tsx,en\drawer\placements.tsx,en\drawer\scrollable-content.tsx,en\drawer\with-form.tsx,en\dropdown\controlled-open-state.tsx,en\dropdown\controlled.tsx,en\dropdown\custom-trigger.tsx,en\dropdown\default.tsx,en\dropdown\long-press-trigger.tsx,en\dropdown\single-with-custom-indicator.tsx,en\dropdown\with-custom-submenu-indicator.tsx,en\dropdown\with-descriptions.tsx,en\dropdown\with-disabled-items.tsx,en\dropdown\with-icons.tsx,en\dropdown\with-keyboard-shortcuts.tsx,en\dropdown\with-multiple-selection.tsx,en\dropdown\with-section-level-selection.tsx,en\dropdown\with-sections.tsx,en\dropdown\with-single-selection.tsx,en\dropdown\with-submenus.tsx,en\error-message\basic.tsx,en\error-message\with-tag-group.tsx,en\field-error\basic.tsx,en\fieldset\basic.tsx,en\fieldset\on-surface.tsx,en\form\basic.tsx,en\form\custom-render-function.tsx,en\input-group\default.tsx,en\input-group\disabled.tsx,en\input-group\full-width.tsx,en\input-group\invalid.tsx,en\input-group\on-surface.tsx,en\input-group\password-with-toggle.tsx,en\input-group\required.tsx,en\input-group\variants.tsx,en\input-group\with-badge-suffix.tsx,en\input-group\with-copy-suffix.tsx,en\input-group\with-icon-prefix-and-copy-suffix.tsx,en\input-group\with-icon-prefix-and-text-suffix.tsx,en\input-group\with-keyboard-shortcut.tsx,en\input-group\with-loading-suffix.tsx,en\input-group\with-prefix-and-suffix.tsx,en\input-group\with-prefix-icon.tsx,en\input-group\with-suffix-icon.tsx,en\input-group\with-text-prefix.tsx,en\input-group\with-text-suffix.tsx,en\input-group\with-textarea.tsx,en\input-otp\basic.tsx,en\input-otp\controlled.tsx,en\input-otp\disabled.tsx,en\input-otp\form-example.tsx,en\input-otp\four-digits.tsx,en\input-otp\on-complete.tsx,en\input-otp\on-surface.tsx,en\input-otp\variants.tsx,en\input-otp\with-pattern.tsx,en\input-otp\with-validation.tsx,en\input\basic.tsx,en\input\controlled.tsx,en\input\full-width.tsx,en\input\on-surface.tsx,en\input\types.tsx,en\input\variants.tsx,en\kbd\basic.tsx,en\kbd\inline.tsx,en\kbd\instructional.tsx,en\kbd\navigation.tsx,en\kbd\special.tsx,en\kbd\variants.tsx,en\label\basic.tsx,en\link\basic.tsx,en\link\custom-icon.tsx,en\link\custom-render-function.tsx,en\link\icon-placement.tsx,en\link\underline-and-offset.tsx,en\link\underline-offset.tsx,en\link\underline-variants.tsx,en\list-box\controlled.tsx,en\list-box\custom-check-icon.tsx,en\list-box\custom-render-function.tsx,en\list-box\default.tsx,en\list-box\multi-select.tsx,en\list-box\scrollbar-modes.tsx,en\list-box\virtualization.tsx,en\list-box\with-disabled-items.tsx,en\list-box\with-sections.tsx,en\meter\basic.tsx,en\meter\colors.tsx,en\meter\custom-value.tsx,en\meter\sizes.tsx,en\meter\without-label.tsx,en\modal\backdrop-variants.tsx,en\modal\close-methods.tsx,en\modal\controlled.tsx,en\modal\custom-animations.tsx,en\modal\custom-backdrop.tsx,en\modal\custom-portal.tsx,en\modal\custom-trigger.tsx,en\modal\default.tsx,en\modal\dismiss-behavior.tsx,en\modal\placements.tsx,en\modal\scroll-comparison.tsx,en\modal\sizes.tsx,en\modal\with-form.tsx,en\number-field\basic.tsx,en\number-field\controlled.tsx,en\number-field\custom-icons.tsx,en\number-field\custom-render-function.tsx,en\number-field\disabled.tsx,en\number-field\form-example.tsx,en\number-field\full-width.tsx,en\number-field\on-surface.tsx,en\number-field\required.tsx,en\number-field\validation.tsx,en\number-field\variants.tsx,en\number-field\with-chevrons.tsx,en\number-field\with-description.tsx,en\number-field\with-format-options.tsx,en\number-field\with-step.tsx,en\number-field\with-validation.tsx,en\pagination\basic.tsx,en\pagination\controlled.tsx,en\pagination\custom-icons.tsx,en\pagination\disabled.tsx,en\pagination\simple-prev-next.tsx,en\pagination\sizes.tsx,en\pagination\with-ellipsis.tsx,en\pagination\with-summary.tsx,en\popover\basic.tsx,en\popover\custom-render-function.tsx,en\popover\interactive.tsx,en\popover\placement.tsx,en\popover\with-arrow.tsx,en\progress-bar\basic.tsx,en\progress-bar\colors.tsx,en\progress-bar\custom-value.tsx,en\progress-bar\indeterminate.tsx,en\progress-bar\sizes.tsx,en\progress-bar\without-label.tsx,en\progress-circle\basic.tsx,en\progress-circle\colors.tsx,en\progress-circle\custom-svg.tsx,en\progress-circle\indeterminate.tsx,en\progress-circle\sizes.tsx,en\progress-circle\with-label.tsx,en\radio-group\basic.tsx,en\radio-group\controlled.tsx,en\radio-group\custom-indicator.tsx,en\radio-group\custom-render-function.tsx,en\radio-group\delivery-and-payment.tsx,en\radio-group\disabled.tsx,en\radio-group\horizontal.tsx,en\radio-group\on-surface.tsx,en\radio-group\uncontrolled.tsx,en\radio-group\validation.tsx,en\radio-group\variants.tsx,en\range-calendar\allows-non-contiguous-ranges.tsx,en\range-calendar\anchor-unavailable-dates.tsx,en\range-calendar\basic.tsx,en\range-calendar\booking-calendar.tsx,en\range-calendar\controlled.tsx,en\range-calendar\day-view.tsx,en\range-calendar\default-value.tsx,en\range-calendar\disabled.tsx,en\range-calendar\focused-value.tsx,en\range-calendar\international-calendar.tsx,en\range-calendar\invalid.tsx,en\range-calendar\min-max-dates.tsx,en\range-calendar\multiple-months.tsx,en\range-calendar\read-only.tsx,en\range-calendar\three-months.tsx,en\range-calendar\unavailable-dates.tsx,en\range-calendar\week-view.tsx,en\range-calendar\weeks-in-month.tsx,en\range-calendar\with-indicators.tsx,en\range-calendar\year-picker.tsx,en\scroll-shadow\custom-size.tsx,en\scroll-shadow\default.tsx,en\scroll-shadow\hide-scroll-bar.tsx,en\scroll-shadow\orientation.tsx,en\scroll-shadow\visibility-change.tsx,en\scroll-shadow\with-card.tsx,en\search-field\basic.tsx,en\search-field\controlled.tsx,en\search-field\custom-icons.tsx,en\search-field\custom-render-function.tsx,en\search-field\disabled.tsx,en\search-field\form-example.tsx,en\search-field\full-width.tsx,en\search-field\on-surface.tsx,en\search-field\required.tsx,en\search-field\validation.tsx,en\search-field\variants.tsx,en\search-field\with-description.tsx,en\search-field\with-keyboard-shortcut.tsx,en\search-field\with-validation.tsx,en\select\asynchronous-loading.tsx,en\select\controlled-multiple.tsx,en\select\controlled-open-state.tsx,en\select\controlled.tsx,en\select\custom-indicator.tsx,en\select\custom-render-function.tsx,en\select\custom-value-multiple.tsx,en\select\custom-value.tsx,en\select\default.tsx,en\select\disabled.tsx,en\select\full-width.tsx,en\select\multiple-select.tsx,en\select\on-surface.tsx,en\select\required.tsx,en\select\variants.tsx,en\select\with-description.tsx,en\select\with-disabled-options.tsx,en\select\with-sections.tsx,en\separator\basic.tsx,en\separator\custom-render-function.tsx,en\separator\manual-variant-override.tsx,en\separator\variants.tsx,en\separator\vertical.tsx,en\separator\with-content.tsx,en\separator\with-surface.tsx,en\skeleton\animation-types.tsx,en\skeleton\basic.tsx,en\skeleton\card.tsx,en\skeleton\grid.tsx,en\skeleton\list.tsx,en\skeleton\single-shimmer.tsx,en\skeleton\text-content.tsx,en\skeleton\user-profile.tsx,en\slider\custom-render-function.tsx,en\slider\default.tsx,en\slider\disabled.tsx,en\slider\range.tsx,en\slider\vertical.tsx,en\spinner\basic.tsx,en\spinner\colors.tsx,en\spinner\sizes.tsx,en\surface\variants.tsx,en\switch\basic.tsx,en\switch\controlled.tsx,en\switch\custom-render-function.tsx,en\switch\custom-styles.tsx,en\switch\default-selected.tsx,en\switch\disabled.tsx,en\switch\form.tsx,en\switch\group-horizontal.tsx,en\switch\group.tsx,en\switch\label-position.tsx,en\switch\render-props.tsx,en\switch\sizes.tsx,en\switch\with-description.tsx,en\switch\with-icons.tsx,en\switch\without-label.tsx,en\table\async-loading.tsx,en\table\basic.tsx,en\table\column-resizing.tsx,en\table\custom-cells.tsx,en\table\empty-state.tsx,en\table\expandable-rows.tsx,en\table\pagination.tsx,en\table\secondary-variant.tsx,en\table\selection.tsx,en\table\sorting.tsx,en\table\tanstack-table.tsx,en\table\virtualization.tsx,en\tabs\basic.tsx,en\tabs\custom-render-function.tsx,en\tabs\custom-styles.tsx,en\tabs\disabled.tsx,en\tabs\overflow.tsx,en\tabs\secondary-vertical.tsx,en\tabs\secondary.tsx,en\tabs\vertical.tsx,en\tabs\with-separator.tsx,en\tag-group\basic.tsx,en\tag-group\controlled.tsx,en\tag-group\custom-render-function.tsx,en\tag-group\disabled.tsx,en\tag-group\selection-modes.tsx,en\tag-group\sizes.tsx,en\tag-group\variants.tsx,en\tag-group\with-error-message.tsx,en\tag-group\with-list-data.tsx,en\tag-group\with-prefix.tsx,en\tag-group\with-remove-button.tsx,en\textarea\basic.tsx,en\textarea\controlled.tsx,en\textarea\full-width.tsx,en\textarea\on-surface.tsx,en\textarea\rows.tsx,en\textarea\variants.tsx,en\textfield\basic.tsx,en\textfield\controlled.tsx,en\textfield\custom-render-function.tsx,en\textfield\disabled.tsx,en\textfield\full-width.tsx,en\textfield\input-types.tsx,en\textfield\on-surface.tsx,en\textfield\required.tsx,en\textfield\textarea.tsx,en\textfield\validation.tsx,en\textfield\with-description.tsx,en\textfield\with-error.tsx,en\time-field\basic.tsx,en\time-field\controlled.tsx,en\time-field\custom-render-function.tsx,en\time-field\disabled.tsx,en\time-field\form-example.tsx,en\time-field\full-width.tsx,en\time-field\invalid.tsx,en\time-field\on-surface.tsx,en\time-field\required.tsx,en\time-field\with-description.tsx,en\time-field\with-prefix-and-suffix.tsx,en\time-field\with-prefix-icon.tsx,en\time-field\with-suffix-icon.tsx,en\time-field\with-validation.tsx,en\toast\callbacks.tsx,en\toast\custom-indicator.tsx,en\toast\custom-queue.tsx,en\toast\custom-toast.tsx,en\toast\default.tsx,en\toast\placements.tsx,en\toast\promise.tsx,en\toast\simple.tsx,en\toast\variants.tsx,en\toggle-button-group\attached.tsx,en\toggle-button-group\basic.tsx,en\toggle-button-group\controlled.tsx,en\toggle-button-group\disabled.tsx,en\toggle-button-group\full-width.tsx,en\toggle-button-group\orientation.tsx,en\toggle-button-group\selection-mode.tsx,en\toggle-button-group\sizes.tsx,en\toggle-button-group\without-separator.tsx,en\toggle-button\basic.tsx,en\toggle-button\controlled.tsx,en\toggle-button\disabled.tsx,en\toggle-button\icon-only.tsx,en\toggle-button\sizes.tsx,en\toggle-button\variants.tsx,en\toolbar\basic.tsx,en\toolbar\custom-styles.tsx,en\toolbar\vertical.tsx,en\toolbar\with-button-group.tsx,en\tooltip\basic.tsx,en\tooltip\custom-render-function.tsx,en\tooltip\custom-trigger.tsx,en\tooltip\placement.tsx,en\tooltip\with-arrow.tsx,en\typography\default.tsx,en\typography\primitives.tsx,en\typography\prose.tsx,en\typography\render-props.tsx,en\typography\typography-scale.tsx}
<!-- HEROUI-REACT-AGENTS-MD-END -->

<!-- CONFIG-RULES-START -->
## 閰嶇疆鏂囦欢淇濇姢瑙勫垯 (Configuration File Protection Rules)

涓ョ淇敼浠ヤ笅椤圭洰閰嶇疆鏂囦欢鍜屼緷璧栫鐞嗭紝鍏蜂綋瑙勫垯濡備笅锛?
1. **绂佹淇敼鐨勯厤缃枃浠?*锛氫互涓嬫枃浠舵湭缁忕敤鎴锋槑纭鍙笉寰椾慨鏀癸細
   - `eslint.config.js` 鈥?ESLint 瑙勮寖閰嶇疆
   - `vite.config.ts` 鈥?Vite 鏋勫缓閰嶇疆
   - `tsconfig.json`銆乣tsconfig.app.json`銆乣tsconfig.node.json` 鈥?TypeScript 閰嶇疆
   - `AGENTS.md` 鈥?浠ｇ悊瑙勫垯鏂囦欢
   - `package.json` 鈥?椤圭洰渚濊禆鍜岃剼鏈厤缃?   - `.gitignore` 鈥?Git 蹇界暐瑙勫垯

2. **渚濊禆绠＄悊瑙勫垯**锛?   - 涓ョ AI 涓诲姩鎵ц `npm install`銆乣pnpm install`銆乣yarn add` 绛夊畨瑁呬緷璧栫殑鍛戒护
   - 涓ョ AI 淇敼 `package.json` 涓殑 `dependencies` 鎴?`devDependencies`
   - 涓ョ AI 鐩存帴淇敼 `node_modules` 鐩綍涓嬬殑浠讳綍鏂囦欢
   - 濡傛灉瀹炵幇鏌愪釜鍔熻兘闇€瑕佸畨瑁呮柊鐨勪緷璧栧寘锛孉I 搴斿悜鐢ㄦ埛璇存槑闇€瑕佸摢浜涗緷璧栧強鍏剁敤閫旓紝鐢辩敤鎴疯嚜琛屽喅瀹氭槸鍚﹀畨瑁?
3. **渚嬪鎯呭喌**锛氫粎鍦ㄧ敤鎴锋槑纭姹備慨鏀硅繖浜涙枃浠舵垨瀹夎渚濊禆鏃讹紝鎵嶅厑璁告墽琛岀浉鍏虫搷浣?
4. **淇瑙勫垯**锛氬鏋?ESLint 瑙勫垯閰嶇疆锛坄eslint.config.js`锛夊鑷存鏌ュけ璐ワ紝搴旈€氳繃淇婧愪唬鐮佹潵瑙ｅ喅闂锛屼笉寰椾慨鏀?ESLint 閰嶇疆鏈韩
<!-- CONFIG-RULES-END -->





