## 1.0.13

Animated landing page

**Untracked**

- Added full text logos
- HomePage `hero.tsx`
- HomePage `content.tsx`
- HomePage content `tab.tsx`
- `scroll-area.tsx` _(Unused)_ for now
- `TABS` constant

**Modified**

- HomePage
- Portrait button now links to portfolio

**Deleted**

- `text-balance` custom class

**Full Changelog**: [1.0.12...1.0.13](https://github.com/famlam-ca/hhn/compare/1.0.12...1.0.13)

## 1.0.12

**Untracked**

- `CHAINGLOG.md`
- About layout
- CERTS constant

**Modified**

- Wrapped root layout children in `<main>` tag
- Centered text inside `not-found.tsx`
- `Next up:` and `Back to:` are mobile responsive
- `seed.ts`
- Moved `cert-showcase.tsx`
- `PROJECTS` Enterprise Network Projects 2024 constant

**Deleted**

- About banner from all about pages

**Full Changelog**: [1.0.11...1.0.12](https://github.com/famlam-ca/hhn/compare/1.0.11...1.0.12)

## 1.0.11

**Untracked**

- Added `.prettierrc`
- Added EnergyConnections project PDF and PNG
- Added Tailwind Typography
- Added content to the projects page
- Sign out page: `useEffect` pushes to callback on signout and refreshes page
- Added `PROJECTS` constant
- Updated packages

**Modified**

- Updated MIT License copyright holder
- Updated `README.md`
- Changed `SessionProvider` value to `sessionData`
- Moved about page and `_components` into `(main)` organizational folder
- Added `prose` class to article tag on about pages
- Updated footer copyright icon
- Updated `db/index.ts`

**Deleted**

- Removed `prettier.config.js`
- Removed `useCopyToClipboard` in contact `onClick`

**Full Changelog**: [1.0.10...1.0.11](https://github.com/famlam-ca/hhn/compare/1.0.10...1.0.11)

## 1.0.10

**Untracked**

- Added MIT License
- Added `HHN.png`

**Modified**

- Updated `package.json` project version
- Replaced `'` with `&apos;`
- Updated `README.md`
- Added `@@index` to database schema
- Renamed `providers.tsx` to `index.tsx`
- Renamed `UserNav` to `UserMenu`
- Updated `user-menu.tsx`
- Username is no longer required to be 8 characters long

**Deleted**

- Removed `@lucia-auth/adapter-drizzle ^1.0.7`

**Full Changelog**: [1.0.9...1.0.10](https://github.com/famlam-ca/HHN/compare/1.0.9...1.0.10)

## 1.0.9

**Untracked**

- Added certs
- Added `Cert-showcase.tsx`
- Added projects page
- Added `projects-content.tsx` (WIP)

**Modified**

- `<UserNav />` profile route now pushes to `/u/username`
- Renamed `email-service.tsx` to `email-service.ts`
- `/project` and `/support` routes are now `/about/project` and `/contact/support`
- Next up buttons on about pages now show at the top and bottom of the screen
- Filled out about me content

**Deleted**

- Removed unnecessary import in `email-service.ts`

**Bug Fixes**

- Sidebar target arrow alignment fixed

**Full Changelog**: [1.0.8.1...1.0.9](https://github.com/SlickYeet/famlam/compare/1.0.8.1...1.0.9)

## 1.0.8.1

**Modified**

- Updated `README.md`

**Bug Fixes**

- Fixed `<SignIn />` button showing when the user is signed in

**Full Changelog**: [1.0.8...1.0.8.1](https://github.com/SlickYeet/famlam/compare/1.0.8...1.0.8.1)

## 1.0.8

**Untracked**

- Added `SupportTicketStatus`
- Added support ticket table, details page, and status actions
- Added `emailRenderer()` for `sendEmail()`
- Added support ticket services
- Added `SupportTicket` and `TicketStatus` types

**Modified**

- `supportTicket` now includes `status` and `statusMessage` (WIP)
- `<UserNav />` is now visible on small devices on all navbars
- Contact page now includes projects route
- Contact page is now correctly mobile responsive
- Updated dashboard server table component imports
- Replaced mobile nav profile route with `<UserNav />`
- Removed toast from `<RefreshButton />`
- Changed `sendEmail()` 'email' property to 'to'
- Moved `sendEmail()` email renderer to its own function
- Updated `EditProfileSchema` to allow GitHub URLs (WIP)

**Deleted**

- Removed `use-user-token.ts`
- Removed `token-service.ts`

**Bug Fixes**

- Sidebar label no longer shows on small devices on reload
- Sidebar on `signOut` now redirects to `/username` from `/u/username` to prevent errors
- Mobile nav now closes on click

**Full Changelog**: [1.0.7...1.0.8](https://github.com/SlickYeet/famlam/compare/1.0.7...1.0.8)

## 1.0.7

**Untracked**

- Added support page and form
- Added support ticket email template
- Added `supportTicket` database table
- Added `/admin/support` route
- Added admin support ticket table (WIP)
- Added admin support ticket columns (WIP)
- Added admin support ticket actions (WIP)
- Added `sendSupportTicketEmail()`
- Added `SupportFormSchema`
- Added `fast-levenshtein 3.0.0`
- Added `@types/fast-levenshtein 0.0.4`
- Added `@types/qs ^6.9.15`

**Modified**

- Updated URLs in email templates
- Updated `text-email.tsx` to have preview props
- Many support routes now push to `/support`
- Updated root layout metadata
- Moved admin user table into its own component subfolder
- Updated admin user table imports
- Updated `<SignUpForm />` form field placeholders
- Footer routes now include `/support`

**Deleted**

- Removed `/terms` routes

**Full Changelog**: [1.0.6...1.0.7](https://github.com/SlickYeet/famlam/compare/1.0.6...1.0.7)

## 1.0.6

**Untracked**

- Added about page content
- Added about me page (WIP)

**Full Changelog**: [1.0.5...1.0.6](https://github.com/SlickYeet/famlam/compare/1.0.5...1.0.6)

# 1.0.5

**Untracked**

- Added content to `/contact`
- Added "none" size to `<Button />`

**Modified**

- Updated `/api/verify-email` to invalidate user session before creating a new one
- Updated `edit-user-profile` `onSubmit()` and `onClick()`
- Updated `edit-user-profile` form fields to be disabled during submission
- Updated edit-user-profile "Send new verification email" button to be disabled on click
- `/profile` now displays username instead of email
- Updated `updateUser()` to call `sendNewVerificationEmail()` when email is submitted

**Deleted**

- Removed `createBlankSessionCookie()` from `invalidateAllUserSessions()`
- Removed `db.session.deleteMany()` from `sendNewVerificationEmail()`

**Full Changelog**: [1.0.4...1.0.5](https://github.com/SlickYeet/famlam/compare/1.0.4...1.0.5)

## 1.0.4

**Untracked**

- Added `.env.example`
- Added `bun.lockb`
- Added sessions column to admin table (WIP)

**Modified**

- Updated `.gitignore` to include `deploy.sh`
- Updated email templates to process the correct production URL
- Updated `sign-in`/`sign-out` links to include `callbackUrl`
- Updated `getSelf()` to take an object
- Moved admin page user actions to its own file
- Moved server table columns into dashboard server components subfolder
- Sets user's preferred theme on sign in
- Updated many `toast()` messages

**Deleted**

- Removed `pnpm-lock.yaml`

**Full Changelog**: [1.0.3...1.0.4](https://github.com/SlickYeet/famlam/compare/1.0.3...1.0.4)

## 1.0.3

**Untracked**

- Added `dev2` script for email templating
- Added `react-email 2.1.1`
- Added `@react-email/components 0.0.16`
- Added email templates
- Added GitHub social icons
- Added logo with text variants
- Added `startTransition()` to `onResendVerificationEmail()`
- Added properties to `sendEmail()`
- Added `sendPasswordWasResetEmail()` to `resetPassword()`
- Added `EmailTemplates` type for `sendEmail()`

**Modified**

- Moved `sendEmail()` into `email-service.ts`
- Renamed `email.ts` to `email-transporter.ts`
- Updated `sendEmail()` imports
- Updated `sendEmail()` to take in data object
- Updated `.gitignore` to not include `/changelogs`
- Updated home page to not be client-side
- Moved `db.resetPassword.deleteMany()` into `sendPasswordWasResetEmail()`
- Updated footer to dynamically display trademark date
- Updated `EditProfile` component layout
- Updated `Button` component to not render illegible text

**Deleted**

- Removed `textVariant` from `tailwind.config.ts`
- Removed unnecessary TODOs

**Full Changelog**: [1.0.2...1.0.3](https://github.com/SlickYeet/famlam/compare/1

## 1.0.2 Changelog

**Untracked:**

- Database resetPassword
- reset-password API endpoint
- Send reset password email page/component
- Reset password page/component, _Currently has the same name as Send reset password email page_
- Tab on form fields no longer focuses show/hide password
- `logoutFromOtherDevices` on password change/reset
- Alert dialog, _(shadcn-ui)_
- Checkbox, _(shadcn-ui)_
- `sendTestEmail()` for testing _duh_
- `createUserSession()` to create session and set cookies
- email-service.ts
- auth-schema.ts
- user-schema.ts

**Modified:**

- Many toast notifications to return proper messages
- Many `return` statements
  - New syntax: `return { success: boolean, message: string }`
- Database user model, _username was not marked properly as unique_
- `getUser()` function to return an user object correctly
- Error pages to `push("/")`
- Sign out page to `push("/")`
- Sign up schema names
- Sign up password placeholders
- Moved EditAccountSchema to separate file
- Checkbox to handle `{children}`
- Edit account page to handle `changePassword()`
- Moved callbackUrl on sign in to `eles if` block
  - It was redirecting on failure

**Deleted:**

- `--textVariant` variables from globals.css

**Full Changelog**: [1.0.1...1.0.2](https://github.com/SlickYeet/famlam/compare/1.0.1...1.0.2)

## 1.0.1 Changelog

**Untracked:**

- verify-email page
- Import paths to use lucia instead of auth
- signUp() to include first and last name fields

**Modified:**

- signIn() with callbackUrl calls
- Dashboard table/nav no longer shows actions or select without permission or user/session

**Deleted:**

- SignOut and SignIn buttons
- signOut() callbackUrl

**Full Changelog**: [1.0.0...1.0.1](https://github.com/SlickYeet/famlam/compare/1.0.0...1.0.1)

## 1.0.0 Changelog

Migrate to lucia-auth from authjs

**Full Changelog**: [1.0.0](https://github.com/SlickYeet/famlam/commits/1.0.0)
