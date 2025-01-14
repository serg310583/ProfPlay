/* eslint-disable react/prop-types */

const EyeToggle = ({ passwordShown, togglePasswordVisibility }) => {
	const closeEye = (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g
				id='&#208;&#187;&#208;&#190;&#208;&#179;&#208;&#184;&#208;&#189;/eye-off'
				clipPath='url(#clip0_692_937)'
			>
				<path
					id='Vector'
					d='M11.9613 11.9599C10.8217 12.8285 9.43404 13.3098 8.0013 13.3332C3.33464 13.3332 0.667969 7.99985 0.667969 7.99985C1.49723 6.45445 2.64739 5.10426 4.0413 4.03985M6.6013 2.82652C7.06019 2.71911 7.53001 2.66541 8.0013 2.66652C12.668 2.66652 15.3346 7.99985 15.3346 7.99985C14.93 8.75693 14.4473 9.46968 13.8946 10.1265M9.41464 9.41319C9.23154 9.60969 9.01074 9.76729 8.7654 9.8766C8.52007 9.98591 8.25524 10.0447 7.9867 10.0494C7.71815 10.0542 7.45141 10.0048 7.20238 9.90418C6.95334 9.80359 6.72712 9.65387 6.5372 9.46396C6.34728 9.27404 6.19756 9.04782 6.09697 8.79878C5.99639 8.54975 5.94699 8.283 5.95172 8.01446C5.95646 7.74592 6.01524 7.48108 6.12455 7.23575C6.23387 6.99042 6.39147 6.76962 6.58797 6.58652'
					stroke='#999999'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					id='Vector_2'
					d='M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z'
					stroke='#999999'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					id='Vector_3'
					d='M0.667969 0.666504L15.3346 15.3332'
					stroke='#999999'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_692_937'>
					<rect width='16' height='16' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)

	const openEye = (
		<svg
			width='16px'
			height='16px'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			stroke='#d4d4d4'
		>
			<g id='SVGRepo_bgCarrier' strokeWidth='0' />
			<g
				id='SVGRepo_tracerCarrier'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<g id='SVGRepo_iconCarrier'>
				{' '}
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z'
					fill='#9e9e9e'
				/>{' '}
			</g>
		</svg>
	)
	return (
		<i onClick={togglePasswordVisibility}>
			{passwordShown ? openEye : closeEye}
		</i>
	)
}
export default EyeToggle
