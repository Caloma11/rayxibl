import { useEffect, useRef } from "react";

// Ref: https://stackoverflow.com/a/57941438/10835772
const useDidMountEffect = (func, deps) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
	}, deps);
};

export default useDidMountEffect;
