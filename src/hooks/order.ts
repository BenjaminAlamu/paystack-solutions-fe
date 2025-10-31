
import { useQuery, useMutation } from '@tanstack/vue-query'
import {
    getSingleOrder,
    createOrder,
    generateDVA,
    verifyMockTransaction
  } from '@/services'
import { FETCH_SINGLE_ORDER_BY_CODE } from '@/services/queryKeys'
import { unref, type Ref, watch } from 'vue'

export const useCreateOrder = () => {
  
    const {
      isPending: isCreatingOrder,
      isError: isCreatingOrderError,
      error: createOrderError,
      isSuccess: createOrderSuccess,
      mutate: handleCreateOrder
    } = useMutation({
      mutationFn: createOrder,
    })
  
    return {
      handleCreateOrder,
      isCreatingOrder,
      isCreatingOrderError,
      createOrderError,
      createOrderSuccess
    }
  }

  export const useAttachDVA = () => {
  
    const {
      isPending: isAttachingDVA,
      isError: isAttachingDVAError,
      error: attachedDVAError,
      isSuccess: attachDVASuccess,
      mutate: handleAttachDVA
    } = useMutation({
      mutationFn: generateDVA,
    })
  
    return {
      handleAttachDVA,
      isAttachingDVA,
      isAttachingDVAError,
      attachedDVAError,
      attachDVASuccess
    }
  }

  export const useMockCall = () => {
  
    const {
      isPending: isVerifyMockTransactionLoading,
      isError: isVerifyMockTransactionError,
      error: mockTransactionError,
      isSuccess: mockTransactionSuccess,
      mutate: handleMockTransaction
    } = useMutation({
      mutationFn: verifyMockTransaction,
    })
  
    return {
      handleMockTransaction,
      isVerifyMockTransactionLoading,
      isVerifyMockTransactionError,
      mockTransactionError,
      mockTransactionSuccess
    }
  }

  export const useGetSingleOrder = (codeRef: Ref<string>, enabled = true) => {
    const query = useQuery({
      queryKey: [FETCH_SINGLE_ORDER_BY_CODE, codeRef],
      queryFn: async () => {
        const code = unref(codeRef);
        if (!code) throw new Error("Missing code");
        return getSingleOrder(code);
      },
      enabled: enabled && !!unref(codeRef),
      refetchOnWindowFocus: false,
    });
  
    watch(codeRef, (newCode: any) => {
      if (newCode) query.refetch();
    });
  
    return {
      ...query,
      singleOrder: query.data,
      isSingleOrderLoading: query.isLoading,
      singleOrderError: query.error,
      refetchSingleOrder: query.refetch,
    };
  };
  